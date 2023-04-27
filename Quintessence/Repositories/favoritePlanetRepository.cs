using Quintessence.Models;
using Quintessence.Repositories;
using Quintessence.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;








namespace Quintessence.Repositories
{
    public class FavoritePlanetRepository : BaseRepository, IFavoritePlanetRepository
    {
        public FavoritePlanetRepository(IConfiguration configuration) : base(configuration) { }

        public List<FavoritePlanet> GetAllFavoritePlanets()
        {
            var favoritePlanets = new List<FavoritePlanet>();
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT FavoritePlanet.Id, FavoritePlanet.UserId, FavoritePlanet.PlanetId,
                                         p.name, p.distance, p.ImageUrl, p.gravity, p.composition, p.orbit, p.atmosphere, p.size
                                        
                                        
                                        From FavoritePlanet
                                        JOIN Planet p ON FavoritePlanet.PlanetId = p.Id
                                        ORDER BY Name";

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        favoritePlanets.Add(new FavoritePlanet
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            PlanetId = DbUtils.GetInt(reader, "planetId"),
                            Planet = new Planet()
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
                            }

                        });
                    }
                    reader.Close();
                    return favoritePlanets;
                }
            }
        }


        public bool CheckIfExists(int id, int userId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT PlanetId FROM FavoritePlanet WHERE PlanetId= @planetId AND UserId = @userId";

                    cmd.Parameters.AddWithValue("@planetId", id);
                    cmd.Parameters.AddWithValue("@userId", userId);

                    var reader = cmd.ExecuteReader();
                    return reader.HasRows;

                }
            }
        }

        public void AddFavoritePlanet(FavoritePlanet favoritePlanet)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO FavoritePlanet ( UserId, PlanetId )
                    OUTPUT INSERTED.Id
                    Values( @userId, @planetId)";

                   
                    cmd.Parameters.AddWithValue("userId", favoritePlanet.UserId);
                    cmd.Parameters.AddWithValue("planetId", favoritePlanet.PlanetId);


                    favoritePlanet.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public FavoritePlanet GetFavoritePlanetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT FavoritePlanet.Id, FavoritePlanet.UserId, FavoritePlanet.PlanetId,
                                        p.id, p.name, p.imageUrl, p.distance, p.gravity, p.composition, p.orbit, p.atmosphere, p.size
                                        FROM FavoritePlanet
                                         JOIN Planet p ON FavoritePlanet.PlanetId = p.Id
                                        WHERE FavoritePlanet.id =@id";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    FavoritePlanet favoritePlanet = null;

                    while (reader.Read())
                    {
                        favoritePlanet = (new FavoritePlanet()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            PlanetId = DbUtils.GetInt(reader, "planetId"),
                            Planet = new Planet()
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
                            }
                        });
                    }
                    reader.Close();
                    return favoritePlanet;
                }
            }
        }

        public void DeleteFavoritePlanet(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM FavoritePlanet
                    WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();

                }
            }
        }






    }
};