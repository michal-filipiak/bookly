package com.example.Tuesday_Bookly.dao;

import java.util.List;
import java.util.Optional;

import com.example.Tuesday_Bookly.models.bookings.BookingDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<BookingDTO, Long>
{
    @Query(value="SELECT bdto.* FROM BookingDTO bdto join User u on u.Id=bdto.owner_id where u.security_token=?1", nativeQuery = true)
    List<BookingDTO> findAllByOwnerSecurityToken(String token);

    @Query(value="SELECT bdto.* FROM BookingDTO bdto join User u on u.Id=bdto.owner_id where (?1 is null or bdto.item_type = ?1) " +
                    "and (?2 is null or u.login like ?2%) order by u.login ASC",
            countQuery = "SELECT count(*) FROM (SELECT bdto.* FROM BookingDTO bdto join User u on u.Id=bdto.owner_id where" +
                    " (?1 is null or bdto.item_type = ?1) and (?2 is null or u.login like ?2%)) as val ",
            nativeQuery = true)
    Page<BookingDTO> findAllByItemTypeAndOrLoginASC(Optional<Integer> type, Optional<String> login, Pageable pageable);


    @Query(value="SELECT bdto.* FROM BookingDTO bdto join User u on u.Id=bdto.owner_id where (?1 is null or bdto.item_type = ?1) " +
            "and (?2 is null or u.login like ?2%) order by u.login DESC",
            countQuery = "SELECT count(*) FROM (SELECT bdto.* FROM BookingDTO bdto join User u on u.Id=bdto.owner_id where" +
                    " (?1 is null or bdto.item_type = ?1) and (?2 is null or u.login like ?2%)) as val ",
            nativeQuery = true)
    Page<BookingDTO> findAllByItemTypeAndOrLoginDESC(Optional<Integer> type, Optional<String> login, Pageable pageable);

    @Query(value="SELECT bdto.* FROM BookingDTO bdto where bdto.item_type = ?1", nativeQuery = true)
    List<BookingDTO> findAllByItemType(Integer type);

    @Query(value="SELECT bdto.* FROM BookingDTO bdto join User u on u.Id=bdto.owner_id where u.login like ?1%", nativeQuery = true)
    List<BookingDTO> findAllByLogin(String login);
}