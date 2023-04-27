

SET IDENTITY_INSERT [Planet] ON
INSERT INTO [Planet]
  ([Id], [Name], [Distance], [ImageUrl], [Gravity], [Composition], [Orbit], [Atmosphere], [Size])
VALUES 
  (1, 'Mercury', '48 million miles', 'https://en.wikipedia.org/wiki/Mercury_(planet)#/media/File:Mercury_in_true_color.jpg', '38% of the surface gravity of Earth', 'Rocky', '88 Earth days', 'Mercury has an extremely thin and non-protective atmosphere. For all practical purposes, the atmosphere is nearly a vacuum. The sparse atmosphere is primarily composed of oxygen, sodium and hydrogen.', '3,031.9 mi'), 
  (2, 'Venus', '25 million miles', 'https://en.wikipedia.org/wiki/Venus#/media/File:Venus_2_Approach_Image.jpg', '91% of the surface gravity of Earth', 'Rocky', '225 Earth days', 'Venus has a thick, toxic atmosphere filled with carbon dioxide and it is perpetually shrouded in thick, yellowish clouds of sulfuric acid that trap heat, causing a runaway greenhouse effect.', '7,520.8 mi'),
  (3, 'Earth', '0', 'https://upload.wikimedia.org/wikipedia/commons/c/cb/The_Blue_Marble_%28remastered%29.jpg', '9.807 m/s²', 'Rocky', '365 days', 'The atmosphere is composed of about 78% nitrogen, 21% oxygen, and one percent other gases. These gases are found in atmospheric layers (troposphere, stratosphere, mesosphere, thermosphere, and exosphere) defined by unique features such as temperature and pressure.', '7,917.5 mi'),
  (4, 'Mars', '140 million miles', 'https://en.wikipedia.org/wiki/Mars#/media/File:Tharsis_and_Valles_Marineris_-_Mars_Orbiter_Mission_(30055660701).png', '38% of the surface gravity of Earth', 'Rocky', '687 Earth days', 'The atmosphere of Mars is over 100 times thinner than the atmosphere of Earth and is primarily composed of carbon dioxide, nitrogen and argon gases', '4,212.3 mi'),
  (5, 'Jupiter', '391 million miles', 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Jupiter_New_Horizons.jpg', '2.4x that of Earth', 'Gaseous', '12 Earth years', 'Jupiter has an extremely dense and relatively dry atmosphere which is composed of a mixture of hydrogen, helium and much smaller amounts of methane and ammonia.', '86,881 mi'),
  (6, 'Saturn', ' 792 million miles', 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg', '1.08x that of Earth', 'Gaseous', '29.4 Earth years', 'Hydrogen makes up nearly all of the atmosphere, with lesser amounts of helium and much lesser quantities of methane and ammonia.', '72,367 mi'),
  (7, 'Uranus', '1.8323 billion miles', 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Uranus_as_seen_by_NASA%27s_Voyager_2_%28remastered%29_-_JPEG_converted.jpg', '91% of the surface gravity of Earth', 'Gaseous', '84 Earth years', 'Like the other gas giants, Uranus has an atmosphere composed of mostly hydrogen, followed by helium and a little methane.', '31,518 mi'),
  (8, 'Neptune', '2.703 billion miles', 'https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg', '1.14x that of Earth', 'Gaseous', '165 Earth years', 'The thick atmosphere of Neptune is mostly hydrogen, with smaller amounts of helium and methane.', '30,775 mi')
SET IDENTITY_INSERT [Planet] OFF



SET IDENTITY_INSERT [Moon] ON
INSERT INTO [Moon]
  ([Id], [Name], [Distance], [PlanetId], [ImageUrl], [Gravity], [Composition], [Orbit], [Atmosphere], [Size])
VALUES 
  (1, 'Moon', '238,900 miles', 3, 'https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg', '17% of the surface gravity of Earth', 'Rocky', '27 Earth days', 'The atmosphere of the Moon is largely made of helium, neon, argon and hydrogen.', '2,159.1 mi'), 
  (2, 'Titan', '746 million miles', 6, 'https://en.wikipedia.org/wiki/Titan_(moon)#/media/File:Titan_in_true_color_by_Kevin_M._Gill.jpg', '14% of the surface gravity of Earth', 'Rocky/Icy', '15 Earth days', 'The atmosphere of Titan is mostly nitrogen (about 95 percent) and methane (about 5 percent), with small amounts of other carbon-rich compounds.', '3,199.7 mi'),
  (3, 'Europa', '390.4 million miles', 5, 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Europa_in_natural_color.png', '13% of the surface gravity of Earth', 'Icy', '3.5 Earth days', 'It has a very thin atmosphere, composed primarily of oxygen.', '1,939.7 mi'),
  (4, 'Io', '390.4 million miles', 5, 'https://en.wikipedia.org/wiki/Io_(moon)#/media/File:Io_highest_resolution_true_color.jpg', '18% of the surface gravity of Earth', 'Rocky', '42 hours', 'Io has a very thin atmosphere is primarily sulfur dioxide; it is also the most volcanically active world in the solar system', '2,263.8 mi')
SET IDENTITY_INSERT [Moon] OFF


SET IDENTITY_INSERT [User] ON
INSERT INTO [User]
([Id], [Name], [Email], [FirebaseUserId])
VALUES
(1, 'Jordan', 'jupiter@gmail.com', 'sHgGIlyfCaXZ90cmuimWxlVoKfg1'),
(2, 'Keon', 'saturn@gmail.com', 'pmXY72SfdJNYBLaVH081i8nkmsL2'),
(3, 'Keitonna', 'pluto@gmail.com', 'EvrwfBIW3AWqHtpfd9Wxia0KK732'),
(4, 'Snoop', 'dirac@gmail.com', 'UgxuLLx6o5So7RERW9msiTDlmxr1')
SET IDENTITY_INSERT [User] OFF


SET IDENTITY_INSERT [favoritePlanet] ON
INSERT INTO [favoritePlanet]
([Id], [UserId], [PlanetId])
VALUES
(1, 1, 4),
(2, 1, 6),
(3, 2, 5),
(4, 3, 3),
(5, 2, 7),
(6, 1, 8)
SET IDENTITY_INSERT [favoritePlanet] OFF



