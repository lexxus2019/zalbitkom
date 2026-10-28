package com.zalbit.app.web;

import com.zalbit.app.domain.ContactMessage;
import com.zalbit.app.domain.SocialLink;
import com.zalbit.app.domain.Track;
import com.zalbit.app.dto.Dtos.*;
import com.zalbit.app.repo.ContactMessageRepository;
import com.zalbit.app.repo.SocialLinkRepository;
import com.zalbit.app.repo.TrackRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    private final TrackRepository tracks;
    private final SocialLinkRepository links;
    private final ContactMessageRepository messages;

    public PublicController(TrackRepository tracks, SocialLinkRepository links,
                            ContactMessageRepository messages) {
        this.tracks = tracks;
        this.links = links;
        this.messages = messages;
    }

    @GetMapping("/site")
    public SiteResponse site() {
        return new SiteResponse(
                tracks.findAllByOrderBySortOrderAscIdAsc().stream().map(PublicController::toDto).toList(),
                links.findAllByOrderBySortOrderAscIdAsc().stream().map(PublicController::toDto).toList());
    }

    @PostMapping("/contact")
    public ResponseEntity<Void> contact(@Valid @RequestBody ContactRequest req) {
        ContactMessage m = new ContactMessage();
        m.setName(req.name());
        m.setReplyTo(req.replyTo());
        m.setBody(req.body());
        m.setStatus("NEW");
        messages.save(m);
        return ResponseEntity.noContent().build();
    }

    static TrackDto toDto(Track t) {
        return new TrackDto(t.getId(), t.getTitle(), t.getLine(), t.getTag(), t.getIsNew(),
                t.getYandexUrl(), t.getMp3Url(), t.getClipUrl(), t.getCoverUrl(), t.getSortOrder());
    }

    static LinkDto toDto(SocialLink l) {
        return new LinkDto(l.getId(), l.getKeyName(), l.getLabel(), l.getUrl(), l.getSortOrder());
    }
}
