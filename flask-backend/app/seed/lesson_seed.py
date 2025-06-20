from app.models import db, Lesson
from app import app

def seed_lessons():
    with app.app_context():
        if db.engine.dialect.has_table(db.engine, 'lessons'):
            db.session.execute(f'TRUNCATE TABLE {Lesson.__tablename__} RESTART IDENTITY CASCADE;')
        else:
            db.create_all()

        docker_lessons = [
            Lesson(quest_id="vite_c0810195-dc36-4000-be18-4cd22f1b8a26", name="Build Docker Image", summary="Builds an image from a Dockerfile.", command="docker build -t my-app ."),
            Lesson(quest_id="vite_c0810195-dc36-4000-be18-4cd22f1b8a26", name="Run Docker Container", summary="Runs a container from an image.", command="docker run -d -p 3000:3000 my-app"),
            Lesson(quest_id="vite_c0810195-dc36-4000-be18-4cd22f1b8a26", name="List Running Containers", summary="Lists all running containers.", command="docker ps"),
            Lesson(quest_id="vite_c0810195-dc36-4000-be18-4cd22f1b8a26", name="List All Containers", summary="Shows running and stopped containers.", command="docker ps -a"),
            Lesson(quest_id="vite_c0810195-dc36-4000-be18-4cd22f1b8a26", name="List Docker Images", summary="Lists all local Docker images.", command="docker images"),
            Lesson(quest_id="vite_c0810195-dc36-4000-be18-4cd22f1b8a26", name="Stop a Container", summary="Stops a running container.", command="docker stop <container_id>"),
            Lesson(quest_id="vite_c0810195-dc36-4000-be18-4cd22f1b8a26", name="Start a Container", summary="Starts a previously stopped container.", command="docker start <container_id>"),
            Lesson(quest_id="vite_c0810195-dc36-4000-be18-4cd22f1b8a26", name="Remove a Container", summary="Deletes a container.", command="docker rm <container_id>"),
            Lesson(quest_id="vite_c0810195-dc36-4000-be18-4cd22f1b8a26", name="Remove an Image", summary="Deletes a Docker image.", command="docker rmi <image_id>"),
            Lesson(quest_id="vite_c0810195-dc36-4000-be18-4cd22f1b8a26", name="Execute in Container", summary="Runs a command inside a running container.", command="docker exec -it <container_id> bash"),
            Lesson(quest_id="vite_c0810195-dc36-4000-be18-4cd22f1b8a26", name="View Container Logs", summary="Shows logs from a container.", command="docker logs <container_id>"),
            Lesson(quest_id="vite_c0810195-dc36-4000-be18-4cd22f1b8a26", name="Pull Docker Image", summary="Downloads image from Docker Hub.", command="docker pull nginx"),
            Lesson(quest_id="vite_c0810195-dc36-4000-be18-4cd22f1b8a26", name="Push Docker Image", summary="Uploads image to Docker Hub.", command="docker push my-username/my-image"),
            Lesson(quest_id="vite_c0810195-dc36-4000-be18-4cd22f1b8a26", name="Tag Docker Image", summary="Adds a new tag to an image.", command="docker tag my-app my-username/my-app:latest"),
            Lesson(quest_id="vite_c0810195-dc36-4000-be18-4cd22f1b8a26", name="Inspect Container", summary="Shows detailed container config and state.", command="docker inspect <container_id>"),
            Lesson(quest_id="vite_c0810195-dc36-4000-be18-4cd22f1b8a26", name="Prune Unused Resources", summary="Removes unused containers, networks, and images.", command="docker system prune"),
            Lesson(quest_id="vite_c0810195-dc36-4000-be18-4cd22f1b8a26", name="Copy Files from Container", summary="Copies files from a container to host.", command="docker cp <container_id>:/app/file.txt ./file.txt"),
            Lesson(quest_id="vite_c0810195-dc36-4000-be18-4cd22f1b8a26", name="Build with No Cache", summary="Builds image without cache.", command="docker build --no-cache -t my-app ."),
            Lesson(quest_id="vite_c0810195-dc36-4000-be18-4cd22f1b8a26", name="Login to Docker Hub", summary="Authenticates with Docker Hub.", command="docker login"),
            Lesson(quest_id="vite_c0810195-dc36-4000-be18-4cd22f1b8a26", name="Detach & Attach Container", summary="Detach with Ctrl+P+Q, reattach with attach.", command="docker attach <container_id>"),
        ]

        db.session.add_all(docker_lessons)
        db.session.commit()
        print("20 Docker lessons seeded successfully.")

if __name__ == '__main__':
    seed_lessons()
