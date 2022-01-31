package com.example.Tuesday_Bookly.dao;

import java.awt.print.Book;
import java.util.List;
import java.util.Optional;

import com.example.Tuesday_Bookly.enums.ItemTypeEnum;
import com.example.Tuesday_Bookly.models.bookings.BookingDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<BookingDTO, Long>
{
    List<BookingDTO> findByActive(boolean active);
    List<BookingDTO> findByItemType(ItemTypeEnum.ItemType type);
    List<BookingDTO> findByowner_login(String login);

    @Query(value="SELECT bdto.* FROM BookingDTO bdto join User u on u.Id=bdto.owner_id where u.security_token=?1", nativeQuery = true)
    List<BookingDTO> findAllByOwnerSecurityToken(String token);


    @Query(value="SELECT bdto.* FROM BookingDTO bdto join User u on u.Id=bdto.owner_id where bdto.item_type = ?1 and u.login like ?2%", nativeQuery = true)
    List<BookingDTO> searchByItemTypeAndLogin(Integer type, String login);

    @Query(value="SELECT bdto.* FROM BookingDTO bdto where bdto.item_type = ?1", nativeQuery = true)
    List<BookingDTO> findAllByItemType(Integer type);

    @Query(value="SELECT bdto.* FROM BookingDTO bdto join User u on u.Id=bdto.owner_id where u.login like ?1%", nativeQuery = true)
    List<BookingDTO> findAllByLogin(String login);
}