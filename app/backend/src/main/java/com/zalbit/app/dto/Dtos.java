package com.zalbit.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

public class Dtos {

    public record TrackDto(
            Long id,
            @NotBlank @Size(max = 200) String title,
            @Size(max = 500) String line,
            @Size(max = 100) String tag,
            Boolean isNew,
            @Size(max = 500) String yandexUrl,
            @Size(max = 500) String mp3Url,
            @Size(max = 500) String clipUrl,
            @Size(max = 500) String coverUrl,
            Integer sortOrder
    ) {}

    public record LinkDto(Long id, String keyName, String label, String url, Integer sortOrder) {}

    public record SiteResponse(List<TrackDto> tracks, List<LinkDto> links) {}

    public record ContactRequest(
            @Size(max = 100) String name,
            @Size(max = 200) String replyTo,
            @NotBlank @Size(max = 3000) String body
    ) {}

    public record LoginRequest(@NotBlank String username, @NotBlank String password) {}

    public record LoginResponse(String token, String username) {}

    public record MessageDto(Long id, String name, String replyTo, String body,
                             String status, LocalDateTime createdAt) {}

    public record UploadResponse(String url) {}
}
