FROM rust:1.68 as builder

WORKDIR /usr/src/app
COPY . .

RUN cargo build --release

FROM debian:buster-slim

WORKDIR /usr/local/bin

COPY --from=builder /usr/src/app/target/release/ai_system_optimizer .

EXPOSE 8083

CMD ["./ai_system_optimizer"] 