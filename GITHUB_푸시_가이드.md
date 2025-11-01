# GitHub에 코드 푸시하기 가이드

## 📋 사전 준비

### 1. Git 설치 확인
터미널에서 다음 명령어로 Git이 설치되어 있는지 확인하세요:
```bash
git --version
```

만약 설치되어 있지 않다면: https://git-scm.com/download/win 에서 다운로드하세요.

### 2. GitHub 계정 준비
- GitHub 계정이 없다면: https://github.com 에서 가입하세요.

---

## 🚀 단계별 가이드

### **1단계: Git 저장소 초기화**

프로젝트 폴더에서 다음 명령어를 실행하세요:

```bash
git init
```

### **2단계: 파일 추가**

모든 파일을 스테이징 영역에 추가합니다:

```bash
git add .
```

특정 파일만 추가하려면:
```bash
git add package.json
git add src/
git add index.html
```

### **3단계: 첫 번째 커밋**

```bash
git commit -m "Initial commit: 축산이음 모바일 웹앱"
```

### **4단계: GitHub 저장소 생성**

1. GitHub 웹사이트 (https://github.com)에 로그인
2. 오른쪽 위 **"+"** 버튼 클릭 → **"New repository"** 선택
3. 저장소 정보 입력:
   - **Repository name**: `livestock-platform` (또는 원하는 이름)
   - **Description**: `축산물 이력제 플랫폼 - 축산이음`
   - **Public** 또는 **Private** 선택
   - ⚠️ **"Initialize this repository with a README"** 체크 해제 (이미 파일이 있으므로)
   - **Add .gitignore**와 **Choose a license**는 선택사항
4. **"Create repository"** 버튼 클릭

### **5단계: 원격 저장소 연결**

GitHub 저장소 생성 후 표시되는 페이지에서 HTTPS URL을 복사합니다.
(예: `https://github.com/사용자명/livestock-platform.git`)

터미널에서 다음 명령어 실행:

```bash
git remote add origin https://github.com/사용자명/livestock-platform.git
```

> 💡 **사용자명/저장소명을 실제 값으로 변경하세요!**

### **6단계: 브랜치 이름 설정 (선택사항)**

최신 Git은 기본 브랜치를 `main`으로 사용합니다:

```bash
git branch -M main
```

### **7단계: GitHub에 푸시**

```bash
git push -u origin main
```

> ⚠️ **처음 푸시 시 인증 필요:**
> - 사용자명과 비밀번호(또는 Personal Access Token) 입력
> - Personal Access Token 사용 방법은 아래 참고

---

## 🔐 GitHub 인증 설정 (Personal Access Token)

### GitHub 비밀번호 인증이 안 될 경우:

1. **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. **"Generate new token"** 클릭
3. **Note**: `livestock-platform` (설명 입력)
4. **Expiration**: 원하는 만료일 선택
5. **Scopes**: `repo` 체크 (전체 권한)
6. **"Generate token"** 클릭
7. ⚠️ **토큰을 복사해 안전한 곳에 보관하세요!** (다시 볼 수 없습니다)

### 푸시 시 사용:
- **Username**: GitHub 사용자명
- **Password**: Personal Access Token (비밀번호가 아님!)

---

## 📝 전체 명령어 요약 (한 번에 실행)

```bash
# 1. Git 초기화
git init

# 2. 파일 추가
git add .

# 3. 커밋
git commit -m "Initial commit: 축산이음 모바일 웹앱"

# 4. 원격 저장소 연결 (GitHub에서 저장소 생성 후)
git remote add origin https://github.com/사용자명/저장소명.git

# 5. 브랜치 이름 설정
git branch -M main

# 6. 푸시
git push -u origin main
```

---

## 🔄 이후 업데이트 푸시

코드를 수정한 후 다시 푸시하려면:

```bash
# 1. 변경사항 확인
git status

# 2. 파일 추가
git add .

# 3. 커밋
git commit -m "변경 내용 설명"

# 4. 푸시
git push
```

---

## ❓ 문제 해결

### "fatal: remote origin already exists" 오류
```bash
# 기존 원격 저장소 제거 후 다시 추가
git remote remove origin
git remote add origin https://github.com/사용자명/저장소명.git
```

### "Permission denied" 오류
- Personal Access Token을 사용하는지 확인
- 저장소에 대한 권한이 있는지 확인

### "refusing to merge unrelated histories" 오류
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## 🎯 다음 단계

GitHub에 푸시 완료 후:

1. **Netlify 배포:**
   - Netlify에 로그인 → "New site from Git" → GitHub 선택
   - 저장소 선택 → Build command: `npm run build` → Publish directory: `dist`

2. **Vercel 배포:**
   - Vercel에 로그인 → "New Project" → GitHub 저장소 선택
   - Framework preset: Vite → 자동 배포

---

## 📚 유용한 Git 명령어

```bash
# 현재 상태 확인
git status

# 커밋 히스토리 보기
git log

# 원격 저장소 확인
git remote -v

# 최신 변경사항 가져오기
git pull

# 브랜치 목록
git branch
```

---

**도움이 필요하시면 언제든지 물어보세요!** 😊

