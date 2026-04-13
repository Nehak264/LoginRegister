package com.LoginRegister.service;
import com.LoginRegister.entity.Users;
import com.LoginRegister.repository.UserRepo;
import com.LoginRegister.request.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    public Users addUser(Users user) {
        return userRepo.save(user);
    }

    public Boolean loginUser(@RequestBody LoginRequest loginRequest) {
        Optional<Users> user = userRepo.findById(loginRequest.getUserId());
        if (user == null) {
            return false;
        }
        Users user1=user.get();
             if(!user1.getUserPassword().equals(loginRequest.getPassword())) {
                 return false;
             }
             return true;
    }
}

