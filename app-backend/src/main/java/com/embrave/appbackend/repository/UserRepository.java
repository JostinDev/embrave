package com.embrave.appbackend.repository;

import com.embrave.appbackend.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {

}
