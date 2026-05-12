# Packet and Event Flow

This page explains the conceptual flow rather than listing every packet type.

## High-level flow

1. a transport consumer authenticates with VoiceCraft
2. entities are created or discovered
3. metadata updates flow into the VoiceCraft world model
4. audio-related state is synchronized
5. clients render resulting voice behavior

## Typical event categories

- login / logout
- ping / info
- entity create / destroy
- metadata updates
- moderation updates
- effect updates
- audio transfer events

## Why this matters

When debugging, it helps to know whether your issue is:

- auth-layer
- entity-layer
- metadata sync
- audio pipeline

Most real failures happen because one of those layers is broken while the others still look healthy.
