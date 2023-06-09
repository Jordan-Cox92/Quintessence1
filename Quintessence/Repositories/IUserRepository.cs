﻿using Quintessence.Models;

namespace Quintessence.Repositories
{
    public interface IUserRepository
    {
        User GetByFirebaseUserId(string firebaseUserId);
        void Add(User user);
    }
}