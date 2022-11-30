INSERT INTO department (id , name)
VALUES  (1, "Offense"),
        (2, "Defense"),
        (3, "Special Teams");

INSERT INTO role (id , title, salary, department_id)
VALUES  (1, "Quarter Back", 200000, 1),
        (2, "Running Back", 150000, 1),
        (3, "Wide Receiver", 100000, 1),
        (4, "Defensive End", 160000, 2),
        (5, "Linebacker", 140000, 2),
        (6, "Safety", 100000, 2),
        (7, "Kicker", 60000, 3),
        (8, "Punter", 50000, 3),
        (9, "Offensive Coordinator", 90000, 1),
        (10, "Defensive Coordinator", 80000, 2),
        (11, "Special Teams Coordinator", 70000, 3);

INSERT INTO employee (id , first_name, last_name, role_id, manager_id)
VALUES  (1, "John", "Elway", 1, 9),
        (2, "Barry", "Sanders", 2, 9),
        (3, "Jerry", "Rice", 3, 9),
        (4, "Von", "Miller", 4, 10),
        (5, "Ray", "Lewis", 5, 10),
        (6, "Ed", "Reed", 6, 10),
        (7, "Jason", "Elam", 7, 11),
        (8, "Ray", "Guy", 8, 11),
        (9, "Bill", "Walsh", 9, null),
        (10, "Bill", "Belichick", 10, null),
        (11, "Scott", "O'Brien", 11, null);
        


