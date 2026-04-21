# GeyserVoice Proxy Guide

Use this mode when you run Velocity or BungeeCord with one or more backend Paper servers.

## How proxy mode works

- backend Paper servers send player snapshots to the proxy
- the proxy owns the VoiceCraft-side `McTcp` connection
- world IDs and dimensions can be namespaced with backend identity

This allows one central voice bridge for a multi-server network.

## Deployment pattern

Install GeyserVoice:

- on the proxy
- on every backend Paper server

## Core rule

The proxy is the source of truth for the VoiceCraft connection.

Backend Paper servers should be treated as snapshot producers, not as the main bridge owner.

## Backend Paper config

On backend Paper servers:

- enable proxy mode for the Paper-side node
- do not treat backend host / port / key as the source of truth

## Proxy config

On the proxy:

- set the real `host`
- set the real `port`
- set the real `login-token`

## Setup flow

1. Install plugin on proxy and backend nodes.
2. Start everything once to generate configs.
3. Configure the proxy with the real VoiceCraft connection.
4. Configure backend nodes for proxy-relay behavior.
5. Reload plugin.
6. Validate cross-server movement and bind flow.

## Validation checklist

- player joins backend
- backend sends snapshots correctly
- proxy remains connected to VoiceCraft
- switching backend servers preserves expected voice identity

## Failure patterns

- backend tries to own the main connection
- proxy token differs from VoiceCraft `McTcpConfig.LoginToken`
- proxy can reach Paper, but not VoiceCraft
- backend topology hides or rewrites plugin messages
