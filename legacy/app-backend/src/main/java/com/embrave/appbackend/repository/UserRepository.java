package com.embrave.appbackend.repository;

import com.embrave.appbackend.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    User findByAuth0Id(String auth0Id);

    boolean existsUserByAuth0Id(String auth0Id);


}
