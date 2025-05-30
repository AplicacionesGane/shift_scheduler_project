INSERT INTO Employees (id, name, role) VALUES
(1, 'John Doe', 'Cashier'),
(2, 'Jane Smith', 'Manager'),
(3, 'Alice Johnson', 'Supervisor');

INSERT INTO Shifts (id, startTime, endTime) VALUES
(1, '09:00:00', '17:00:00'),
(2, '17:00:00', '01:00:00'),
(3, '01:00:00', '09:00:00');

INSERT INTO Stores (id, name, location) VALUES
(1, 'Main Store', '123 Main St'),
(2, 'Second Store', '456 Second St');

INSERT INTO WorkSchedules (id, employeeId, shiftId) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);