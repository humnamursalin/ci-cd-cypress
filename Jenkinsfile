pipeline {
    agent any

    stages {

        stage('Install Python Dependencies') {
            steps {
                sh '''
                    python3 -m pip install --user --upgrade pip
                    python3 -m pip install --user -r requirements.txt
                '''
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh '''
                    python3 -m pytest -v
                '''
            }
        }

        stage('Install Node Dependencies') {
            steps {
                dir('frontend') {
                    sh '''
                        if [ ! -f package.json ]; then
                            npm init -y
                        fi
                        npm install
                    '''
                }
            }
        }

        stage('Serve Frontend') {
            steps {
                sh 'nohup python3 -m http.server 8080 --directory frontend &'
                sh 'sleep 3'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                dir('frontend') {
                    sh 'npx cypress run'
                }
            }
        }
    }

    post {
        always {
            sh 'pkill -f "http.server" || true'
        }
    }
}
