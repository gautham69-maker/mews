#!/usr/bin/env python3
import csv, json, random, uuid, argparse, datetime, os

OUT_DIR = "infra/db/seed/out"
random.seed(42)

def uid(): return str(uuid.uuid4())
def iso(dt=None): return ((dt or datetime.datetime.utcnow()).replace(microsecond=0).isoformat()+"Z")

def rect_polygon_wkt(cx, cy, w=0.0015, h=0.0010):
    x1, y1 = cx - w/2, cy - h/2
    x2, y2 = cx + w/2, cy + h/2
    pts = [(x1,y1),(x2,y1),(x2,y2),(x1,y2),(x1,y1)]
    coords = ", ".join([f"{round(x,6)} {round(y,6)}" for x,y in pts])
    return f"POLYGON(({coords}))"

def centroid_from_wkt(wkt: str) -> str:
    inside = wkt[wkt.find("((")+2:wkt.find("))")]
    parts = inside.split(",")
    xs = ys = 0.0; n = 0
    for p in parts[:-1]:
        x, y = [float(t) for t in p.strip().split(" ")]
        xs += x; ys += y; n += 1
    return f"{round(xs/n,6)},{round(ys/n,6)}"

def write_csv(path, headers, rows):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=headers); w.writeheader()
        for r in rows: w.writerow(r)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--small", action="store_true")
    cfg = ap.parse_args()

    N_LAYOUTS = 50 if cfg.small else 1000
    N_PARCELS = 300 if cfg.small else 10000

    # --- minimal example: layouts + parcels ---
    layouts, parcels = [], []
    for i in range(N_LAYOUTS):
        lon, lat = 80 + random.random()/10, 14 + random.random()/10
        geom = rect_polygon_wkt(lon, lat, w=0.01, h=0.008)
        layouts.append({
            "id": uid(),
            "name": f"Layout {i+1}",
            "developer": "Dummy Dev Pvt Ltd",
            "area_sq_m": random.randint(20000, 100000),
            "geometry": geom,
            "approval_no": f"APP/{random.randint(2015,2025)}/{random.randint(1000,9999)}",
            "authority": "DTCP",
            "created_at": iso(), "updated_at": iso()
        })
    for i in range(N_PARCELS):
        geom = rect_polygon_wkt(80+random.random()/10,14+random.random()/10)
        parcels.append({
            "id": uid(), "survey_no": f"{random.randint(1,300)}/{random.randint(1,10)}A",
            "village_code": f"VIL{i%20:03d}", "mandal_code": f"MAN{i%10:03d}", "district_code": "NLR",
            "village_name": "DummyVillage", "mandal_name": "DummyMandal", "district_name": "Nellore",
            "centroid": centroid_from_wkt(geom), "geometry": geom,
            "layout_id": random.choice(layouts)["id"], "status": random.choice(["Approved","Pending","Unauthorized"]),
            "area_sq_m": random.randint(120, 1200),
            "created_at": iso(), "updated_at": iso()
        })

    write_csv(f"{OUT_DIR}/layouts.csv",
        ["id","name","developer","area_sq_m","geometry","approval_no","authority","created_at","updated_at"], layouts)
    write_csv(f"{OUT_DIR}/parcels.csv",
        ["id","survey_no","village_code","mandal_code","district_code","village_name","mandal_name","district_name","centroid","geometry","layout_id","status","area_sq_m","created_at","updated_at"], parcels)

    print(f"✅ generated {len(layouts)} layouts, {len(parcels)} parcels")

if __name__ == "__main__":
    main()
