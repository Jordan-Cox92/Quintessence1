using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

using Quintessence.Models;
using Quintessence.Utils;

namespace Quintessence.Repositories
{
    public class MoonRepository : BaseRepository, IMoonRepository
    {
        public MoonRepository(IConfiguration configuration) : base(configuration) { }

        public List<Moon> GetAllMoons()
        {
            var moons = new List<Moon>();
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Moon.Id, Moon.Name, Moon.PlanetId, Moon.ImageUrl, Moon.Distance, Moon.Gravity, Moon.Composition, Moon.Orbit, Moon.Atmosphere, Moon.Size,
                                        p.name AS Planetname

                                    From Moon
                                    JOIN Planet p ON Moon.PlanetId = p.Id
                                ORDER BY Moon.Name;";

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        moons.Add(new Moon
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            ImageUrl = DbUtils.GetString(reader, "imageUrl"),
                            PlanetId = DbUtils.GetInt(reader, "planetid"),
                            Distance = DbUtils.GetString(reader, "distance"),
                            Gravity = DbUtils.GetString(reader, "gravity"),
                            Composition = DbUtils.GetString(reader, "composition"),
                            Orbit = DbUtils.GetString(reader, "orbit"),
                            Atmosphere = DbUtils.GetString(reader, "atmosphere"),
                            Size = DbUtils.GetString(reader, "size"),
                            Planet = new Planet()
                            {
                                
                                Name = DbUtils.GetString(reader, "Planetname"),
                               
                            }

                        });
                    }
                    reader.Close();
                    return moons;
                }
            }
        }


        public bool CheckIfExists(string name)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Name FROM Moon WHERE Name= @name";

                    cmd.Parameters.AddWithValue("name", name);

                    var reader = cmd.ExecuteReader();
                    return reader.HasRows;

                }
            }
        }

        public void AddMoon(Moon moon)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Moon (Name, ImageUrl, PlanetId, Distance, Gravity, Composition, Orbit, Atmosphere, Size )
                    OUTPUT INSERTED.Id
                    Values(@name, @imageUrl, @planetId, @distance, @gravity, @composition, @orbit, @atmosphere, @size)";

                    cmd.Parameters.AddWithValue("name", moon.Name);
                    cmd.Parameters.AddWithValue("imageUrl", moon.ImageUrl);
                    cmd.Parameters.AddWithValue("planetId", moon.PlanetId);
                    cmd.Parameters.AddWithValue("distance", moon.Distance);
                    cmd.Parameters.AddWithValue("gravity", moon.Gravity);
                    cmd.Parameters.AddWithValue("composition", moon.Composition);
                    cmd.Parameters.AddWithValue("orbit", moon.Orbit);
                    cmd.Parameters.AddWithValue("atmosphere", moon.Atmosphere);
                    cmd.Parameters.AddWithValue("size", moon.Size);

                    moon.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public Moon GetMoonById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT m.id, m.name, m.imageUrl, m.planetId, m.distance, m.gravity, m.composition, m.orbit, m.atmosphere, m.size
                                        FROM Moon m
                                         WHERE id = @id";


                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    Moon moon = null;

                    if (reader.Read())
                    {
                        moon = (new Moon()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            ImageUrl = DbUtils.GetString(reader, "imageUrl"),
                            PlanetId = DbUtils.GetInt(reader, "planetId"),
                            Distance = DbUtils.GetString(reader, "distance"),
                            Gravity = DbUtils.GetString(reader, "gravity"),
                            Composition = DbUtils.GetString(reader, "composition"),
                            Orbit = DbUtils.GetString(reader, "orbit"),
                            Atmosphere = DbUtils.GetString(reader, "atmosphere"),
                            Size = DbUtils.GetString(reader, "size")
                        });
                    }
                    reader.Close();
                    return moon;
                }
            }
        }

        public void DeleteMoon(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM Moon
                    WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();

                }
            }
        }

        public void EditMoon(Moon moon)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Moon 
                                        SET 
                                        [Name] = @name,
                                        [ImageUrl] = @imageUrl,
                                        [PlanetId] = @planetId,
                                        [Distance] = @distance,
                                        [Gravity] = @gravity,
                                        [Composition] = @composition,
                                        [Orbit] = @orbit,
                                        [Atmosphere] = @atmosphere,
                                        [Size] = @size
                                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", moon.Id);
                    cmd.Parameters.AddWithValue("@name", moon.Name);
                    cmd.Parameters.AddWithValue("@imageUrl", moon.ImageUrl);
                    cmd.Parameters.AddWithValue("@planetId", moon.PlanetId);
                    cmd.Parameters.AddWithValue("@distance", moon.Distance);
                    cmd.Parameters.AddWithValue("@gravity", moon.Gravity);
                    cmd.Parameters.AddWithValue("@composition", moon.Composition);
                    cmd.Parameters.AddWithValue("@orbit", moon.Orbit);
                    cmd.Parameters.AddWithValue("@atmosphere", moon.Atmosphere);
                    cmd.Parameters.AddWithValue("@size", moon.Size);
                    cmd.ExecuteNonQuery();
                }
            }
        }




    }
};







