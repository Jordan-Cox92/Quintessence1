using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

using Quintessence.Models;
using Quintessence.Utils;

namespace Quintessence.Repositories
{
    public class PlanetRepository : BaseRepository, IPlanetRepository
    {
        public PlanetRepository(IConfiguration configuration) : base(configuration) { }

        public List<Planet> GetAllPlanets()
        {
            var planets = new List<Planet>();
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, ImageUrl, Distance, Gravity, Composition, Orbit, Atmosphere, Size
                                    From Planet ORDER BY name;";

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        planets.Add(new Planet
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            ImageUrl = DbUtils.GetString(reader, "imageUrl"),
                            Distance = DbUtils.GetString(reader, "distance"),
                            Gravity = DbUtils.GetString(reader, "gravity"),
                            Composition = DbUtils.GetString(reader, "composition"),
                            Orbit = DbUtils.GetString(reader, "orbit"),
                            Atmosphere = DbUtils.GetString(reader, "atmosphere"),
                            Size = DbUtils.GetString(reader, "size"),

                        });
                    }
                    reader.Close();
                    return planets;
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
                    SELECT Name FROM Planet WHERE Name= @name";

                    cmd.Parameters.AddWithValue("name", name);

                    var reader = cmd.ExecuteReader();
                    return reader.HasRows;

                }
            }
        }

        public void AddPlanet(Planet planet)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Planet (Name, ImageUrl, Distance, Gravity, Composition, Orbit, Atmosphere, Size )
                    OUTPUT INSERTED.Id
                    Values(@name, @imageUrl, @distance, @gravity, @composition, @orbit, @atmosphere, @size)";

                    cmd.Parameters.AddWithValue("name", planet.Name);
                    cmd.Parameters.AddWithValue("imageUrl", planet.ImageUrl);
                    cmd.Parameters.AddWithValue("distance", planet.Distance);
                    cmd.Parameters.AddWithValue("gravity", planet.Gravity);
                    cmd.Parameters.AddWithValue("composition", planet.Composition);
                    cmd.Parameters.AddWithValue("orbit", planet.Orbit);
                    cmd.Parameters.AddWithValue("atmosphere", planet.Atmosphere);
                    cmd.Parameters.AddWithValue("size", planet.Size);

                    planet.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public Planet GetPlanetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.id, p.name, p.imageUrl, p.distance, p.gravity, p.composition, p.orbit, p.atmosphere, p.size
                                        FROM Planet p
                                        WHERE id = @id";
                                        
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    Planet planet = null;

                    if (reader.Read())
                    {
                        planet = (new Planet()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            ImageUrl = DbUtils.GetString(reader, "imageUrl"),
                            Distance = DbUtils.GetString(reader, "distance"),
                            Gravity = DbUtils.GetString(reader, "gravity"),
                            Composition = DbUtils.GetString(reader, "composition"),
                            Orbit = DbUtils.GetString(reader, "orbit"),
                            Atmosphere = DbUtils.GetString(reader, "atmosphere"),
                            Size = DbUtils.GetString(reader, "size")
                        });
                    }
                    reader.Close();
                    return planet;
                }
            }
        }

        public void DeletePlanet(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM Planet
                    WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();

                }
            }
        }

        public void EditPlanet(Planet planet)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Planet 
                                        SET 
                                        [Name] = @name,
                                        [ImageUrl] = @imageUrl,
                                        [Distance] = @distance,
                                        [Gravity] = @gravity,
                                        [Composition] = @composition,
                                        [Orbit] = @orbit,
                                        [Atmosphere] = @atmosphere,
                                        [Size] = @size
                                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", planet.Id);
                    cmd.Parameters.AddWithValue("@name", planet.Name);
                    cmd.Parameters.AddWithValue("@imageUrl", planet.ImageUrl);
                    cmd.Parameters.AddWithValue("@distance", planet.Distance);
                    cmd.Parameters.AddWithValue("@gravity", planet.Gravity);
                    cmd.Parameters.AddWithValue("@composition", planet.Composition);
                    cmd.Parameters.AddWithValue("@orbit", planet.Orbit);
                    cmd.Parameters.AddWithValue("@atmosphere", planet.Atmosphere);
                    cmd.Parameters.AddWithValue("@size", planet.Size);
                    cmd.ExecuteNonQuery();
                }
            }
        }




    }
};
      
            
            
               
            

