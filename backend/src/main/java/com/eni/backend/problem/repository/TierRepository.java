package com.eni.backend.problem.repository;

import com.eni.backend.problem.entity.Tier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TierRepository extends JpaRepository<Tier, Long> {

    Optional<Tier> findById(Long problemId);

}
