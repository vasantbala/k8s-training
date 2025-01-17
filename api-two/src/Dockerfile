# Start from the official Golang base image
FROM golang:1.19-alpine

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

RUN go mod init api-two

# Build the Go app
RUN go build -o api-two .

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the executable
CMD ["./api-two"]