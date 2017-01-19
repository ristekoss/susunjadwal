from mongoengine import *
from models import *
import MySQLdb
import re

connect('susun-jadwal')

db = MySQLdb.connect("localhost", "root", "mau tau aja", "susunjadwal")

cursor = db.cursor()

CREATE TABLE

sql = """create table major (
		 id bigint not null auto_increment primary key,
		 name varchar(50) not null
		 )"""
cursor.execute(sql)

sql = """create table course (
		 id bigint not null auto_increment primary key,
		 name varchar(50) not null,
		 sks int not null,
		 term int not null,
		 major_id bigint not null,
		 foreign key (major_id) references major(id)
		 on delete cascade
		 )"""
cursor.execute(sql)

sql = """create table class (
		 id bigint not null auto_increment primary key,
		 name varchar(50) not null,
		 course_id bigint not null,
		 foreign key (course_id) references course(id)
		 on delete cascade
		 )"""
cursor.execute(sql)

sql = """create table user (
		 id bigint not null auto_increment primary key,
		 name varchar(200) not null,
		 npm varchar(50) not null,
		 angkatan varchar(10) not null,
		 major_id bigint not null,
		 foreign key (major_id) references major(id)
		 on delete cascade
		 )"""
cursor.execute(sql)

sql = """create table user_class(
		 id bigint not null auto_increment primary key,
		 class_id bigint not null,
		 user_id bigint not null,
		 foreign key (class_id) references class(id)
		 on delete cascade,
		 foreign key (user_id) references user(id)
		 on delete cascade
		 )"""
cursor.execute(sql)
# INSERT MAJOR DATA

major_list = ['ilmu-komputer', 'sistem-informasi']

def save_major(name):
	sql = """insert into major(name) values ('{}')""".format(name)
	cursor.execute(sql)
	sql = """select id from major where name='{}'""".format(name)
	cursor.execute(sql)
	results = cursor.fetchone()
	return results[0]
	
def save_course(courses, major_id):
	for course in courses:
		sql = """insert into course(name, sks, term, major_id)
		         values ('{}', {}, {}, {})""".format(course.name, course.sks, course.term, major_id)
		cursor.execute(sql)
		sql = """select id from course where name='{}'""".format(course.name)
		cursor.execute(sql)
		course_id = cursor.fetchone()
		save_class(course.classes, course_id[0])

def save_class(classes, course_id):
	for kelas in classes:
		sql = """insert into class(name, course_id) values ('{}', {})""".format(kelas.name, course_id)
		cursor.execute(sql)

def save_user(users, major_id):
	for user in users:

		sql = """insert into user(name, npm, angkatan, major_id)
				 values("{}", "{}", "{}", {})
			  """.format(
					user.name, user.npm, user.angkatan, major_id
				)
		cursor.execute(sql)
		sql = """select id from user where name='{}'""".format(re.escape(user.name))
		cursor.execute(sql)
		user_id = cursor.fetchone()

		jadwals = Jadwal.objects(user_id=user, primary=True).first()
		if jadwals is not None:
			save_jadwal(jadwals, user_id[0])

def save_jadwal(jadwals, user_id):
	jadwals = dict((v.name, v) for v in jadwals.jadwals).values()

	sql = """select * from class"""
	cursor.execute(sql)
	classes = cursor.fetchall()

	for jadwal in jadwals:
		for kelas in classes:
			if jadwal.name == kelas[1]:
				sql = """insert into user_class(class_id, user_id) values({}, {})""".format(kelas[0], user_id)
				cursor.execute(sql)

for major_name in major_list:
	major = Major.objects(name=major_name).first()
	users = User.objects(major=major).all()

	major_id = save_major(major.name)
	save_course(major.courses, major_id)
	save_user(users, major_id)

db.commit()

# CLEANUP

# sql = """drop table user_class"""
# cursor.execute(sql)
# sql = """drop table user"""
# cursor.execute(sql)
# sql = """drop table class"""
# cursor.execute(sql)
# sql = """drop table course"""
# cursor.execute(sql)
# sql = """drop table major"""
# cursor.execute(sql)