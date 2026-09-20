pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/herynantenainarazafimahatratra-sketch/gestion-stock-frontend.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t gestion-stock-frontend --build-arg VITE_API_URL=http://localhost:8080/api .'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker stop gestion-stock-frontend || true
                    docker rm gestion-stock-frontend || true
                    docker run -d --name gestion-stock-frontend \
                        --network gestion-stock-network \
                        -p 5173:80 \
                        gestion-stock-frontend
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline frontend terminé avec succès !'
        }
        failure {
            echo 'Le pipeline frontend a échoué.'
        }
    }
}