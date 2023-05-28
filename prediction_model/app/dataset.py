from collections import defaultdict

from prediction_model.app.database import DataBase


def preprocess_build(build_tuple):
    build_dict = dict()
    build_dict["roof"] = str(build_tuple[2])
    build_dict["construction_year"] = int(build_tuple[5] if build_tuple[5] is not None else "-1")
    build_dict["reconstruction_year"] = int(build_tuple[6] if build_tuple[6] is not None else "-1")
    build_dict["num_levels"] = int(build_tuple[8] if build_tuple[8] is not None else "-1")
    build_dict["num_entrance"] = int(build_tuple[9] if build_tuple[9] is not None else "-1")
    build_dict["num_flat"] = int(build_tuple[10] if build_tuple[10] is not None else "-1")
    build_dict["life_area"] = float(build_tuple[12] if build_tuple[12] is not None else "-1.0")
    build_dict["non_life_area"] = float(build_tuple[13] if build_tuple[13] is not None else "-1.0")
    build_dict["wall_material"] = str(build_tuple[17])
    build_dict["num_passenger_elevators"] = int(build_tuple[19] if build_tuple[19] is not None else "-1")
    build_dict["num_cargo_passanger_elevators"] = int(build_tuple[20] if build_tuple[20] is not None else "-1")
    build_dict["material_roof"] = str(build_tuple[22])
    build_dict["unom"] = int(build_tuple[23] if build_tuple[23] is not None else "-1")
    build_dict["type_housing_stock"] = int(build_tuple[25] if build_tuple[25] is not None else "-1")
    build_dict["num_cargo_elevators"] = int(build_tuple[28] if build_tuple[28] is not None else "-1")
    return build_dict


def preprocess_incidents(incident_tuple):
    incident_dict = dict()
    incident_dict["name"] = str(incident_tuple[0])
    incident_dict["creation_date"] = str(incident_tuple[2])
    # incident_dict["close_date"] = str(incident_tuple[3])
    incident_dict["unom"] = int(incident_tuple[6])
    # incident_dict["end_date"] = str(incident_tuple[7])
    return incident_dict


def load_data_per_build():
    db = DataBase()
    cursor = db.get_cursor()
    cursor.execute("select * from build;")
    build_records = cursor.fetchall()
    build_dicts = [preprocess_build(x) for x in build_records]
    cursor.execute("select * from incidents;")
    incidents_records = cursor.fetchall()
    incidents_dicts = [preprocess_incidents(x) for x in incidents_records]
    unom2incedent = defaultdict(list)
    for inc_d in incidents_dicts:
        unom2incedent[inc_d["unom"]].append(inc_d)
    print(len(set([x["unom"] for x in build_dicts]).intersection(set([x["unom"] for x in incidents_dicts]))))
    for b_d in build_dicts:
        b_d_unom = b_d["unom"]
        b_d["incidents"] = unom2incedent[b_d_unom]




if __name__ == "__main__":
    load_data_per_build()
