import sqlite3


class DataBase:
    def __init__(self):
        self.sqlite_connection = self.get_connection()
        self.cursor = self.sqlite_connection.cursor()
        print("База данных создана и успешно подключена к SQLite")

        sqlite_select_query = "select sqlite_version();"
        self.cursor.execute(sqlite_select_query)
        record = self.cursor.fetchall()
        print("Версия базы данных SQLite: ", record)

        sqlite_select_query = "select * from build;"
        self.cursor.execute(sqlite_select_query)
        records = self.cursor.fetchall()
        print(f"Build contains: {len(records)}")
        self.cursor.close()

    def get_build_by_unom(self, cursor, unom: int):
        sqlite_select_query = f"select * from build where unom={unom};"
        cursor.execute(sqlite_select_query)
        record = cursor.fetchall()
        return record

    def get_incedents_for_building(self, cursor, unom: int):
        sqlite_select_query = f"select * from incidents where unom={unom};"
        cursor.execute(sqlite_select_query)
        record = cursor.fetchall()
        return record

    def get_cursor(self):
        self.sqlite_connection = self.get_connection()
        return self.sqlite_connection.cursor()

    def get_connection(self):
        return sqlite3.connect('../LCT_Data.db')
