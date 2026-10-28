package com.zalbit.app.web;

import com.zalbit.app.domain.ContactMessage;
import com.zalbit.app.dto.Dtos.MessageDto;
import com.zalbit.app.dto.Dtos.UploadResponse;
import com.zalbit.app.repo.ContactMessageRepository;
import com.zalbit.app.service.StorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/api/admin")
public class AdminOpsController {

    private static final Set<String> STATUSES = Set.of("NEW", "IN_PROGRESS", "DONE");

    private final ContactMessageRepository messages;
    private final StorageService storage;

    public AdminOpsController(ContactMessageRepository messages, StorageService storage) {
        this.messages = messages;
        this.storage = storage;
    }

    @GetMapping("/messages")
    public List<MessageDto> listMessages() {
        return messages.findAllByOrderByCreatedAtDescIdDesc().stream().map(m ->
                new MessageDto(m.getId(), m.getName(), m.getReplyTo(), m.getBody(),
                        m.getStatus(), m.getCreatedAt())).toList();
    }

    @PutMapping("/messages/{id}/status")
    public MessageDto setStatus(@PathVariable Long id, @RequestParam String status) {
        if (!STATUSES.contains(status)) throw new ResponseStatusException(BAD_REQUEST, "статусы: " + STATUSES);
        ContactMessage m = messages.findById(id).orElseThrow(() -> new ResponseStatusException(NOT_FOUND));
        m.setStatus(status);
        messages.save(m);
        return new MessageDto(m.getId(), m.getName(), m.getReplyTo(), m.getBody(), m.getStatus(), m.getCreatedAt());
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        messages.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/media")
    public UploadResponse upload(@RequestParam("file") MultipartFile file) {
        return new UploadResponse(storage.store(file));
    }
}
