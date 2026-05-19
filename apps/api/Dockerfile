# Stage 1: Build the standalone binary
FROM oven/bun:1 AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY src/ ./src/
COPY build.ts ./
COPY tsconfig.json ./
COPY drizzle.config.ts ./

ENV BUILD_TARGET=true
RUN bun run build.ts

# Stage 2: Minimal runtime
FROM gcr.io/distroless/cc-debian12:nonroot

COPY --from=builder /app/build/server /server

EXPOSE 3001

ENTRYPOINT ["/server"]