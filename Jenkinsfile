pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'pnpm install'
            }
        }
        stage('Build Astro Site') {
            steps {
                sh 'pnpm astro build'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('astro-nginx-image')
                }
            }
        }
        stage('Run Nginx Docker Container') {
            steps {
                script {
                    docker.image('astro-nginx-image').run('-p 80:80')
                }
            }
        }
    }
    post {
        success {
            echo 'Build and Deployment were Successful!'
        }
        failure {
            echo 'Build or Deployment Failed.'
        }
    }
}
