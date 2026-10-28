package com.zalbit.app.repo;

import com.zalbit.app.domain.SocialLink;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SocialLinkRepository extends JpaRepository<SocialLink, Long> {
    List<SocialLink> findAllByOrderBySortOrderAscIdAsc();
    Optional<SocialLink> findByKeyName(String keyName);
}
