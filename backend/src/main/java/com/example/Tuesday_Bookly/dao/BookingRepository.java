package com.example.Tuesday_Bookly.dao;

import java.awt.print.Book;
import java.util.List;

import com.example.Tuesday_Bookly.enums.ItemTypeEnum;
import com.example.Tuesday_Bookly.models.bookings.BookingDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<BookingDTO, Long>
{
    List<BookingDTO> findByActive(boolean active);
    List<BookingDTO> findByitemType(ItemTypeEnum.ItemType type);
    List<BookingDTO> findByowner_login(String login);

    List<BookingDTO> findAllByOwnerSecurityToken(String token);
}