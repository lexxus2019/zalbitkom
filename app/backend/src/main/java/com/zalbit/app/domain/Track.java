package com.zalbit.app.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "track")
public class Track {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String line;

    private String tag;

    @Column(name = "is_new")
    private Boolean isNew;

    @Column(name = "yandex_url")
    private String yandexUrl;

    @Column(name = "mp3_url")
    private String mp3Url;

    @Column(name = "clip_url")
    private String clipUrl;

    @Column(name = "cover_url")
    private String coverUrl;

    @Column(name = "sort_order")
    private Integer sortOrder;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getLine() { return line; }
    public void setLine(String line) { this.line = line; }
    public String getTag() { return tag; }
    public void setTag(String tag) { this.tag = tag; }
    public Boolean getIsNew() { return isNew; }
    public void setIsNew(Boolean isNew) { this.isNew = isNew; }
    public String getYandexUrl() { return yandexUrl; }
    public void setYandexUrl(String yandexUrl) { this.yandexUrl = yandexUrl; }
    public String getMp3Url() { return mp3Url; }
    public void setMp3Url(String mp3Url) { this.mp3Url = mp3Url; }
    public String getClipUrl() { return clipUrl; }
    public void setClipUrl(String clipUrl) { this.clipUrl = clipUrl; }
    public String getCoverUrl() { return coverUrl; }
    public void setCoverUrl(String coverUrl) { this.coverUrl = coverUrl; }
    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}
