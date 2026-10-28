package com.zalbit.app.web;

import com.zalbit.app.domain.SocialLink;
import com.zalbit.app.domain.Track;
import com.zalbit.app.dto.Dtos.LinkDto;
import com.zalbit.app.dto.Dtos.TrackDto;
import com.zalbit.app.repo.SocialLinkRepository;
import com.zalbit.app.repo.TrackRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/api/admin")
public class AdminContentController {

    private final TrackRepository tracks;
    private final SocialLinkRepository links;

    public AdminContentController(TrackRepository tracks, SocialLinkRepository links) {
        this.tracks = tracks;
        this.links = links;
    }

    @GetMapping("/tracks")
    public List<TrackDto> listTracks() {
        return tracks.findAllByOrderBySortOrderAscIdAsc().stream().map(PublicController::toDto).toList();
    }

    @PostMapping("/tracks")
    public TrackDto createTrack(@Valid @RequestBody TrackDto dto) {
        Track t = new Track();
        apply(t, dto);
        return PublicController.toDto(tracks.save(t));
    }

    @PutMapping("/tracks/{id}")
    public TrackDto updateTrack(@PathVariable Long id, @Valid @RequestBody TrackDto dto) {
        Track t = tracks.findById(id).orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
        apply(t, dto);
        return PublicController.toDto(tracks.save(t));
    }

    @DeleteMapping("/tracks/{id}")
    public ResponseEntity<Void> deleteTrack(@PathVariable Long id) {
        tracks.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private static void apply(Track t, TrackDto d) {
        t.setTitle(d.title());
        t.setLine(d.line());
        t.setTag(d.tag());
        t.setIsNew(Boolean.TRUE.equals(d.isNew()));
        t.setYandexUrl(d.yandexUrl());
        t.setMp3Url(d.mp3Url());
        t.setClipUrl(d.clipUrl());
        t.setCoverUrl(d.coverUrl());
        t.setSortOrder(d.sortOrder() == null ? 0 : d.sortOrder());
    }

    @GetMapping("/links")
    public List<LinkDto> listLinks() {
        return links.findAllByOrderBySortOrderAscIdAsc().stream().map(PublicController::toDto).toList();
    }

    @PutMapping("/links/{id}")
    public LinkDto updateLink(@PathVariable Long id, @RequestBody LinkDto dto) {
        SocialLink l = links.findById(id).orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
        if (dto.label() != null) l.setLabel(dto.label());
        l.setUrl(dto.url());
        if (dto.sortOrder() != null) l.setSortOrder(dto.sortOrder());
        return PublicController.toDto(links.save(l));
    }

    @PostMapping("/links")
    public LinkDto createLink(@RequestBody LinkDto dto) {
        if (dto.keyName() == null || dto.keyName().isBlank()) {
            throw new ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "keyName обязателен");
        }
        links.findByKeyName(dto.keyName()).ifPresent(existing -> {
            throw new ResponseStatusException(org.springframework.http.HttpStatus.CONFLICT, "ключ уже есть");
        });
        SocialLink l = new SocialLink();
        l.setKeyName(dto.keyName());
        l.setLabel(dto.label());
        l.setUrl(dto.url());
        l.setSortOrder(dto.sortOrder() == null ? 0 : dto.sortOrder());
        return PublicController.toDto(links.save(l));
    }

    @DeleteMapping("/links/{id}")
    public ResponseEntity<Void> deleteLink(@PathVariable Long id) {
        links.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
