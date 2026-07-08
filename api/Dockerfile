# Use Rust slim image for smaller size and faster builds
FROM rust:slim as builder

# Install build dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create a new empty shell project
WORKDIR /app
RUN cargo new --bin portfolio-api
WORKDIR /app/portfolio-api

# Copy only the manifests first
COPY Cargo.toml Cargo.lock ./

# Build only the dependencies to cache them
RUN cargo build --release
RUN rm src/*.rs

# Now copy your source code
COPY src ./src

# Build for release
RUN touch src/main.rs && cargo build --release

FROM ubuntu:22.04
WORKDIR /app

# Install runtime dependencies (TLS root certificates)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy the built binary from the builder stage
COPY --from=builder /app/portfolio-api/target/release/portfolio-api .

# Expose the default port (this is just documentation, not functional)
EXPOSE 8081

# The app reads PORT from the environment and defaults to 8081
CMD ["./portfolio-api"]
