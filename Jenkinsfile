pipeline {
    agent any

    stages {

        stage('Install Python Deps') {
            steps {
                sh 'pip install -r requirements.txt'
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh 'pytest -v'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    // create package.json if missing, then install deps
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
                // serve static files from ./frontend on port 8080
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
