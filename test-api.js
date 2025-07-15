// test-api.js
require('dotenv').config();
const axios = require('axios');

class ShinobiAPI {
    constructor() {
        // 환경 변수에서 읽어오기
        this.baseUrl = process.env.SHINOBI_URL || 'http://localhost:8080';
        this.apiKey = process.env.SHINOBI_API_KEY;
        this.groupKey = process.env.SHINOBI_GROUP_KEY;
        
        // API 키 확인
        if (!this.apiKey || !this.groupKey) {
            throw new Error('❌ .env 파일에 SHINOBI_API_KEY와 SHINOBI_GROUP_KEY를 설정해주세요!');
        }
        
        console.log('🔗 Shinobi API 연결 설정:');
        console.log(`   URL: ${this.baseUrl}`);
        console.log(`   API Key: ${this.apiKey.substring(0, 8)}...`);
        console.log(`   Group Key: ${this.groupKey}\n`);
    }

    async getMonitors() {
        try {
            const url = `${this.baseUrl}/${this.apiKey}/monitor/${this.groupKey}`;
            console.log('🔍 카메라 목록 조회 중...');
            console.log('URL:', url);
            
            const response = await axios.get(url);
            console.log('✅ 카메라 목록:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ 오류:', error.message);
            return null;
        }
    }

    async startRecording(monitorId) {
        try {
            const url = `${this.baseUrl}/${this.apiKey}/monitor/${this.groupKey}/${monitorId}/record/start`;
            console.log(`🎬 녹화 시작 중... (카메라: ${monitorId})`);
            
            const response = await axios.get(url);
            console.log('✅ 녹화 시작됨:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ 녹화 시작 실패:', error.message);
            return null;
        }
    }

    async stopRecording(monitorId) {
        try {
            const url = `${this.baseUrl}/${this.apiKey}/monitor/${this.groupKey}/${monitorId}/record/stop`;
            console.log(`⏹️ 녹화 정지 중... (카메라: ${monitorId})`);
            
            const response = await axios.get(url);
            console.log('✅ 녹화 정지됨:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ 녹화 정지 실패:', error.message);
            return null;
        }
    }

    async getVideos(monitorId) {
        try {
            const url = `${this.baseUrl}/${this.apiKey}/videos/${this.groupKey}/${monitorId}`;
            console.log(`📽️ 영상 목록 조회 중... (카메라: ${monitorId})`);
            
            const response = await axios.get(url);
            
            // 디버깅 정보 추가
            console.log('🔍 Raw response:', typeof response.data);
            console.log('🔍 Response data:', response.data);
            
            // 안전한 길이 체크
            const videoCount = Array.isArray(response.data) ? response.data.length : 
                            response.data && response.data.videos ? response.data.videos.length : 0;
            
            console.log(`✅ 영상 목록: ${videoCount} 개`);
            return response.data;
        } catch (error) {
            console.error('❌ 영상 목록 조회 실패:', error.message);
            return null;
        }
    }
}

// 메인 테스트 함수
async function main() {
    console.log('🚀 Shinobi API 테스트 시작!\n');
    
    const shinobi = new ShinobiAPI();
    
    // 1. 카메라 목록 조회
    const monitors = await shinobi.getMonitors();
    
    if (!monitors || monitors.length === 0) {
        console.log('❌ 카메라가 없습니다. 먼저 카메라를 추가해주세요.');
        return;
    }
    
    const monitorId = monitors[0].mid;
    console.log(`\n📹 테스트 카메라: ${monitors[0].name} (ID: ${monitorId})`);
    
    // 2. 녹화 시작
    await shinobi.startRecording(monitorId);
    
    // 3. 10초 대기
    console.log('\n⏱️ 10초 동안 녹화 중...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // 4. 녹화 정지
    await shinobi.stopRecording(monitorId);
    
    // 5. 영상 목록 확인
    await shinobi.getVideos(monitorId);
    
    console.log('\n🎉 테스트 완료!');
}

// 실행
main().catch(console.error);