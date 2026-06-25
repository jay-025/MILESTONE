USE event_manager;

INSERT INTO user (iduser, fullName, email)
VALUES 
(1, 'Jay Mahida', 'jay@gmail.com'),
(2, 'Harkirat Kaur', 'harkirat@gmail.com'),
(3, 'Mike Ross', 'Mikeross@gmail.com'),
(4, 'Harvey Spector', 'HS@gmail.cpm');

SELECT * FROM user;

INSERT INTO category (category_id , name, description, status)
VALUES
(1, 'Music', 'CONCERTT', 'Active'),
(2, 'Sports', 'FIFA 2026 Canada', 'Active'),
(3, 'Festival', 'CANADA DAY 2026', 'Active');

SELECT * FROM category;


INSERT INTO events (idevents, name, description, location, date, category_id)
VALUES
(1, 'Live Music Night', 'Local concert', 'CLUB', '2026-06-26', 1),
(2, 'FIFA Fan Festival', 'Watch with all of us', 'Uptown Waterloo', '2026-06-27', 2),
(3, 'Canada Day Festival', 'Celebrate Canad a day with snacks and drinkdatedates', 'Kitchener City Hall', '2026-07-08', 3);

SELECT * FROM events;