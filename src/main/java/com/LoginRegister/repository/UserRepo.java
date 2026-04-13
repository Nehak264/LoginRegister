package com.LoginRegister.repository;

import com.LoginRegister.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<Users, Integer>  {
}
