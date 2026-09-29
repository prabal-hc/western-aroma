"""
Procedural roasted coffee bean -> public/models/coffee-bean.glb

Run:  blender -b --python tools/blender/coffee_bean.py -- [--preview out.png]

Builds a high-res bean (flat front with S-shaped crease, domed back),
bakes colour / roughness / normal maps from a procedural Cycles shader,
then splits it into BeanLeft / BeanRight halves (pivot at bean centre)
so the intro can fly the halves together.

Coordinates below are written in glTF space (Y up, +Z = crease side
facing camera) and converted to Blender space (Z up) on write.
"""

import math
import os
import sys

import bmesh
import bpy
from mathutils import Vector, noise

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(ROOT, "public", "models", "coffee-bean.glb")
TEX = 1024

argv = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
PREVIEW = argv[argv.index("--preview") + 1] if "--preview" in argv else None


def crease_x(Y):
    """Centre line of the S-shaped crease (gl X as a function of gl Y)."""
    return 0.04 * math.sin(Y * 5.2) + 0.008


def smoothstep(e0, e1, x):
    t = max(0.0, min(1.0, (x - e0) / (e1 - e0)))
    return t * t * (3 - 2 * t)


# ── Geometry ────────────────────────────────────────────────────────────
bpy.ops.wm.read_factory_settings(use_empty=True)

bm = bmesh.new()
bm.loops.layers.uv.new("UVMap")
bmesh.ops.create_uvsphere(bm, u_segments=320, v_segments=160, radius=1.0, calc_uvs=True)

masks = []  # (chaff, groove) per vertex, same order as mesh vertices
for v in bm.verts:
    bx, by, bz = v.co
    x, y, z = bx, bz, -by  # blender -> gl

    Y = 0.5 * y
    X = 0.35 * x * (1 - 0.07 * y)  # one end slightly narrower
    Z = 0.27 * z * (1 - 0.40 * smoothstep(-0.3, 0.6, z))  # flatter front

    # S-shaped crease on the front face
    xc = crease_x(Y)
    d = X - xc
    front = smoothstep(0.15, 0.55, z)
    along = 1 - smoothstep(0.36, 0.48, abs(Y))
    groove = math.exp(-((d / 0.015) ** 2)) * front * along
    Z -= 0.11 * groove
    # rounded shoulders either side of the slit
    Z += 0.012 * math.exp(-(((abs(d) - 0.042) / 0.03) ** 2)) * front * along

    # medium-scale wrinkles
    p = Vector((X, Y, Z))
    dirn = p.normalized()
    w = noise.noise(p * 9.0) * 0.0045 + noise.noise(p * 24.0 + Vector((3, 1, 7))) * 0.0015
    p = p + dirn * w * (1 - groove)

    v.co = Vector((p.x, -p.z, p.y))  # gl -> blender
    masks.append((math.exp(-((d / 0.013) ** 2)) * front * along, math.exp(-((d / 0.034) ** 2)) * front * along))

me = bpy.data.meshes.new("Bean")
bm.to_mesh(me)
bm.free()

attr = me.color_attributes.new("crease", "FLOAT_COLOR", "POINT")
for i, (c, g) in enumerate(masks):
    attr.data[i].color = (c, g, 0.0, 1.0)

bean = bpy.data.objects.new("Bean", me)
bpy.context.scene.collection.objects.link(bean)
bpy.context.view_layer.objects.active = bean
bean.select_set(True)
bpy.ops.object.shade_smooth()

dec = bean.modifiers.new("dec", "DECIMATE")
dec.ratio = 0.32
bpy.ops.object.modifier_apply(modifier="dec")
tri = bean.modifiers.new("tri", "TRIANGULATE")
bpy.ops.object.modifier_apply(modifier="tri")
print("verts after decimate:", len(bean.data.vertices))


# ── Procedural shader (bake source) ─────────────────────────────────────
def node(nt, kind, loc, **inputs):
    n = nt.nodes.new(kind)
    n.location = loc
    for k, val in inputs.items():
        if k in n.inputs:
            n.inputs[k].default_value = val
        else:
            setattr(n, k, val)
    return n


src = bpy.data.materials.new("BeanProc")
src.use_nodes = True
nt = src.node_tree
nt.nodes.clear()
L = nt.links.new

out = node(nt, "ShaderNodeOutputMaterial", (1400, 0))
bsdf = node(nt, "ShaderNodeBsdfPrincipled", (1100, 0))
L(bsdf.outputs["BSDF"], out.inputs["Surface"])

tc = node(nt, "ShaderNodeTexCoord", (-1200, 0))
ca = nt.nodes.new("ShaderNodeVertexColor")
ca.layer_name = "crease"
ca.location = (-1200, 400)
sep = node(nt, "ShaderNodeSeparateColor", (-1000, 400))
L(ca.outputs["Color"], sep.inputs["Color"])
chaff, groove = sep.outputs["Red"], sep.outputs["Green"]

# mottled roast colour
n1 = node(nt, "ShaderNodeTexNoise", (-900, 0), Scale=5.0, Detail=10.0, Roughness=0.62)
L(tc.outputs["Object"], n1.inputs["Vector"])
ramp = nt.nodes.new("ShaderNodeValToRGB")
ramp.location = (-650, 0)
ramp.color_ramp.elements[0].position = 0.3
ramp.color_ramp.elements[0].color = (0.04, 0.017, 0.008, 1)
ramp.color_ramp.elements[1].position = 0.72
ramp.color_ramp.elements[1].color = (0.15, 0.065, 0.028, 1)
L(n1.outputs["Fac"], ramp.inputs["Fac"])

# fine speckle
n2 = node(nt, "ShaderNodeTexNoise", (-900, -300), Scale=90.0, Detail=4.0)
L(tc.outputs["Object"], n2.inputs["Vector"])
speck = node(nt, "ShaderNodeMix", (-400, 0))
speck.data_type = "RGBA"
speck.blend_type = "MULTIPLY"
speck.inputs["Factor"].default_value = 0.35
L(ramp.outputs["Color"], speck.inputs[6])
L(n2.outputs["Color"], speck.inputs[7])

# darker groove walls
dark = node(nt, "ShaderNodeMix", (-150, 0))
dark.data_type = "RGBA"
dark.inputs[7].default_value = (0.035, 0.014, 0.006, 1)
gmul = node(nt, "ShaderNodeMath", (-400, 300), operation="MULTIPLY")
gmul.inputs[1].default_value = 0.75
L(groove, gmul.inputs[0])
L(gmul.outputs[0], dark.inputs["Factor"])
L(speck.outputs[2], dark.inputs[6])

# golden silverskin in the slit, broken up by fibrous noise
fib = node(nt, "ShaderNodeTexNoise", (-900, 600), Scale=55.0, Detail=6.0)
L(tc.outputs["Object"], fib.inputs["Vector"])
fmul = node(nt, "ShaderNodeMath", (-650, 600), operation="MULTIPLY")
L(chaff, fmul.inputs[0])
L(fib.outputs["Fac"], fmul.inputs[1])
fpow = node(nt, "ShaderNodeMath", (-400, 600), operation="MULTIPLY")
fpow.inputs[1].default_value = 1.6
fpow.use_clamp = True
L(fmul.outputs[0], fpow.inputs[0])
skin = node(nt, "ShaderNodeMix", (100, 0))
skin.data_type = "RGBA"
skin.inputs[7].default_value = (0.30, 0.17, 0.065, 1)
L(fpow.outputs[0], skin.inputs["Factor"])
L(dark.outputs[2], skin.inputs[6])
L(skin.outputs[2], bsdf.inputs["Base Color"])

# roughness: oily roast sheen with variation, matte chaff
n3 = node(nt, "ShaderNodeTexNoise", (-900, -600), Scale=14.0, Detail=3.0)
L(tc.outputs["Object"], n3.inputs["Vector"])
rmap = node(nt, "ShaderNodeMapRange", (-600, -600))
rmap.inputs["To Min"].default_value = 0.26
rmap.inputs["To Max"].default_value = 0.55
L(n3.outputs["Fac"], rmap.inputs["Value"])
rmix = node(nt, "ShaderNodeMix", (100, -600))
rmix.data_type = "FLOAT"
rmix.inputs[3].default_value = 0.85
L(fpow.outputs[0], rmix.inputs["Factor"])
L(rmap.outputs["Result"], rmix.inputs[2])
L(rmix.outputs[0], bsdf.inputs["Roughness"])

# bump: pores + wrinkles + hairline cracks
n4 = node(nt, "ShaderNodeTexNoise", (-900, -900), Scale=70.0, Detail=12.0, Roughness=0.7)
L(tc.outputs["Object"], n4.inputs["Vector"])
vor = nt.nodes.new("ShaderNodeTexVoronoi")
vor.feature = "DISTANCE_TO_EDGE"
vor.location = (-900, -1200)
vor.inputs["Scale"].default_value = 4.5
L(tc.outputs["Object"], vor.inputs["Vector"])
crack = node(nt, "ShaderNodeMapRange", (-650, -1200))
crack.inputs["From Min"].default_value = 0.0
crack.inputs["From Max"].default_value = 0.012
L(vor.outputs["Distance"], crack.inputs["Value"])
cmask = node(nt, "ShaderNodeTexNoise", (-900, -1500), Scale=3.0, Detail=2.0)
L(tc.outputs["Object"], cmask.inputs["Vector"])
cm = node(nt, "ShaderNodeMapRange", (-650, -1500))
cm.inputs["From Min"].default_value = 0.5
cm.inputs["From Max"].default_value = 0.56
cm.inputs["To Min"].default_value = 1.0
cm.inputs["To Max"].default_value = 0.0
L(cmask.outputs["Fac"], cm.inputs["Value"])
cadd = node(nt, "ShaderNodeMath", (-450, -1300), operation="MAXIMUM")
cadd.use_clamp = True
L(crack.outputs["Result"], cadd.inputs[0])
L(cm.outputs["Result"], cadd.inputs[1])
wr = node(nt, "ShaderNodeTexNoise", (-900, -750), Scale=16.0, Detail=8.0, Roughness=0.55)
L(tc.outputs["Object"], wr.inputs["Vector"])
hsum = node(nt, "ShaderNodeMath", (-650, -850), operation="ADD")
L(n4.outputs["Fac"], hsum.inputs[0])
L(wr.outputs["Fac"], hsum.inputs[1])
hmix = node(nt, "ShaderNodeMath", (-400, -1000), operation="MULTIPLY")
L(hsum.outputs[0], hmix.inputs[0])
L(cadd.outputs[0], hmix.inputs[1])
bump = node(nt, "ShaderNodeBump", (800, -800), Strength=0.45, Distance=0.004)
L(hmix.outputs[0], bump.inputs["Height"])
L(bump.outputs["Normal"], bsdf.inputs["Normal"])

bean.data.materials.append(src)

# ── Bake ────────────────────────────────────────────────────────────────
scene = bpy.context.scene
scene.render.engine = "CYCLES"
scene.cycles.device = "CPU"
scene.cycles.samples = 8
scene.render.bake.margin = 16


def bake(name, kind, colorspace, **kw):
    img = bpy.data.images.new(name, TEX, TEX, alpha=False)
    img.colorspace_settings.name = colorspace
    tex = nt.nodes.new("ShaderNodeTexImage")
    tex.image = img
    nt.nodes.active = tex
    bpy.ops.object.bake(type=kind, **kw)
    nt.nodes.remove(tex)
    img.pack()
    print("baked", name)
    return img


img_col = bake("bean_color", "DIFFUSE", "sRGB", pass_filter={"COLOR"})
img_rgh = bake("bean_rough", "ROUGHNESS", "Non-Color")
img_nrm = bake("bean_normal", "NORMAL", "Non-Color", normal_space="TANGENT")

# ── Final (exportable) materials ────────────────────────────────────────
mat = bpy.data.materials.new("BeanRoasted")
mat.use_nodes = True
mt = mat.node_tree
p = mt.nodes["Principled BSDF"]
t_col = mt.nodes.new("ShaderNodeTexImage")
t_col.image = img_col
t_rgh = mt.nodes.new("ShaderNodeTexImage")
t_rgh.image = img_rgh
t_nrm = mt.nodes.new("ShaderNodeTexImage")
t_nrm.image = img_nrm
nmap = mt.nodes.new("ShaderNodeNormalMap")
mt.links.new(t_col.outputs["Color"], p.inputs["Base Color"])
mt.links.new(t_rgh.outputs["Color"], p.inputs["Roughness"])
mt.links.new(t_nrm.outputs["Color"], nmap.inputs["Color"])
mt.links.new(nmap.outputs["Normal"], p.inputs["Normal"])
p.inputs["Coat Weight"].default_value = 0.35
p.inputs["Coat Roughness"].default_value = 0.3

inner = bpy.data.materials.new("BeanInner")
inner.use_nodes = True
ip = inner.node_tree.nodes["Principled BSDF"]
ip.inputs["Base Color"].default_value = (0.12, 0.055, 0.024, 1)
ip.inputs["Roughness"].default_value = 0.9

bean.data.materials.clear()
bean.data.materials.append(mat)
bean.data.materials.append(inner)
bean.data.attributes.remove(bean.data.color_attributes["crease"])


# ── Split into halves along the crease ──────────────────────────────────
# Faces are assigned by centroid relative to the S-curve, so the seam runs
# down the dark slit. Original smooth normals are carried across the split
# so the rejoined bean shows no seam.
bean.data.attributes.new("onrm", "FLOAT_VECTOR", "POINT")
na = bean.data.attributes["onrm"].data
for i, v in enumerate(bean.data.vertices):
    na[i].vector = v.normal


def half(name, keep_left):
    m = bean.data.copy()
    b = bmesh.new()
    b.from_mesh(m)
    drop = []
    for f in b.faces:
        c = f.calc_center_median()
        gx, gy = c.x, c.z
        if (gx < crease_x(gy)) != keep_left:
            drop.append(f)
    bmesh.ops.delete(b, geom=drop, context="FACES")
    boundary = [e for e in b.edges if e.is_boundary]
    caps = bmesh.ops.holes_fill(b, edges=boundary, sides=0)["faces"]
    caps = bmesh.ops.triangulate(b, faces=caps, quad_method="BEAUTY", ngon_method="BEAUTY")["faces"]
    cap_set = set(caps)
    for f in cap_set:
        f.material_index = 1
    b.faces.index_update()
    cap_idx = {f.index for f in cap_set}
    b.to_mesh(m)
    b.free()

    onrm = m.attributes["onrm"].data
    loop_normals = [None] * len(m.loops)
    for poly in m.polygons:
        for li in poly.loop_indices:
            vi = m.loops[li].vertex_index
            loop_normals[li] = tuple(poly.normal) if poly.index in cap_idx else tuple(onrm[vi].vector)
    m.normals_split_custom_set(loop_normals)
    m.attributes.remove(m.attributes["onrm"])
    o = bpy.data.objects.new(name, m)
    scene.collection.objects.link(o)
    return o


left = half("BeanLeft", True)
right = half("BeanRight", False)
bpy.data.objects.remove(bean)

# ── Export ──────────────────────────────────────────────────────────────
os.makedirs(os.path.dirname(OUT), exist_ok=True)
for o in scene.objects:
    o.select_set(True)
bpy.ops.export_scene.gltf(
    filepath=OUT,
    export_format="GLB",
    use_selection=True,
    export_image_format="JPEG",
    export_jpeg_quality=88,
    export_tangents=True,
    export_apply=True,
    export_vertex_color="NONE",
    export_materials="EXPORT",
)
print("exported", OUT, os.path.getsize(OUT) // 1024, "KB")

# ── Optional preview render ─────────────────────────────────────────────
if PREVIEW:
    world = bpy.data.worlds.new("w")
    world.color = (0.01, 0.006, 0.004)
    scene.world = world
    cam = bpy.data.objects.new("cam", bpy.data.cameras.new("cam"))
    cam.data.lens = 85
    scene.collection.objects.link(cam)
    cam.location = (0.35, -2.6, 0.45)
    cam.rotation_euler = (math.radians(80), 0, math.radians(7.5))
    scene.camera = cam
    for loc, energy, col in [((-1.5, -2, 1.5), 180, (1, 0.85, 0.7)), ((1.8, 1.5, 1.0), 260, (1, 0.7, 0.45))]:
        ld = bpy.data.lights.new("l", "AREA")
        ld.energy = energy
        ld.color = col
        ld.size = 1.5
        lo = bpy.data.objects.new("l", ld)
        lo.location = loc
        lo.rotation_euler = (Vector((0, 0, 0)) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
        scene.collection.objects.link(lo)
    scene.render.resolution_x = scene.render.resolution_y = 700
    scene.cycles.samples = 64
    scene.render.filepath = PREVIEW
    bpy.ops.render.render(write_still=True)
    print("preview", PREVIEW)
