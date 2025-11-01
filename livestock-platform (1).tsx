import React, { useState } from 'react';
import { Search, Star, Camera, Users, Gift, TrendingUp, ChefHat, Leaf, QrCode, Home, User, ShoppingBag, MessageCircle, Heart, MessageSquare, Bookmark, Flag } from 'lucide-react';

const LivestockPlatform = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userPoints, setUserPoints] = useState(1250);
  const [evaluation, setEvaluation] = useState({
    taste: 0,
    color: '',
    texture: '',
    fat: '',
    aroma: 0,
    overall: 0,
    repurchase: 0
  });
  const [communityCategory, setCommunityCategory] = useState('all');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [authForm, setAuthForm] = useState({
    username: '',
    password: '',
    name: ''
  });
  const [users, setUsers] = useState([]); // 메모리에 사용자 저장

  // 샘플 데이터
  const products = [
    {
      id: 1,
      name: '한우 1++ 등심',
      origin: '충남 홍성',
      rating: 4.8,
      reviews: 127,
      image: '🥩',
      tags: ['저탄소', '1++등급'],
      farmer: '김한우 농가',
      taste: 4.9,
      color: 4.7,
      aroma: 4.8,
      fat: 4.6,
      // 상세 이력 정보
      traceNumber: '002 1786 2623 0',
      birthDate: '2022-05-26',
      monthAge: 25,
      breed: '한우',
      gender: '거세',
      farmOwner: '최준수',
      farmId: '521080',
      farmLocation: '전북특별자치도 고창군 공음면 청보리로',
      butcherDate: '2024-06-24',
      butcherPlace: '(주)박달제엘피씨(LPC)',
      butcherLocation: '충청북도 제천시 봉양읍 의암로',
      inspectionResult: '합격',
      carcassWeight: '485kg',
      meatGrade: '1+등급',
      packingPlace: '동양플러스(주)제천지점',
      packingLocation: '충청북도 제천시 봉양읍 의암로'
    },
    {
      id: 2,
      name: '돼지 삼겹살',
      origin: '전북 익산',
      rating: 4.6,
      reviews: 89,
      image: '🥓',
      tags: ['저탄소', '동물복지'],
      farmer: '박돈육 농가',
      taste: 4.5,
      color: 4.7,
      aroma: 4.4,
      fat: 4.8,
      // 상세 이력 정보
      traceNumber: '003 2891 4523 5',
      birthDate: '2024-03-15',
      monthAge: 7,
      breed: '돼지',
      gender: '암',
      farmOwner: '박돈육',
      farmId: '621090',
      farmLocation: '전라북도 익산시 왕궁면',
      butcherDate: '2024-10-10',
      butcherPlace: '익산축산물공판장',
      butcherLocation: '전라북도 익산시',
      inspectionResult: '합격',
      carcassWeight: '95kg',
      meatGrade: '1등급',
      packingPlace: '익산육가공센터',
      packingLocation: '전라북도 익산시'
    }
  ];

  const recipes = [
    {
      id: 1,
      title: '한우 등심 스테이크',
      author: '맛집러버',
      likes: 234,
      image: '🍖',
      points: '+50pt'
    },
    {
      id: 2,
      title: '돼지고기 김치찌개',
      author: '요리왕',
      likes: 189,
      image: '🍲',
      points: '+50pt'
    }
  ];

  const communityPosts = [
    {
      id: 1,
      category: 'review',
      title: '홍성 한우 1++ 등심 먹어봤는데 진짜 대박!',
      author: '고기마니아',
      content: '어제 홍성에서 온 1++ 등심 먹었는데 진짜 입에서 녹아요...',
      image: '🥩',
      likes: 156,
      comments: 23,
      tags: ['한우', '1++', '등심'],
      isHot: true,
      time: '2시간 전'
    },
    {
      id: 2,
      category: 'farm',
      title: '우리 농장 돼지들 운동시키는 영상 ㅎㅎ',
      author: '박돈육농가',
      content: '동물복지 인증받은 우리 농장 돼지들이 뛰어노는 모습입니다~',
      image: '🐷',
      likes: 289,
      comments: 45,
      tags: ['동물복지', '돼지', '농장'],
      isHot: true,
      time: '5시간 전'
    },
    {
      id: 3,
      category: 'challenge',
      title: '저탄소 축산물 챌린지 2주차 성공!',
      author: '지구지킴이',
      content: '이번주도 저탄소 인증 제품만 구매했어요. 탄소 5kg 절감!',
      image: '🌱',
      likes: 92,
      comments: 18,
      tags: ['저탄소', '챌린지', '환경'],
      isHot: false,
      time: '1일 전'
    },
    {
      id: 4,
      category: 'tip',
      title: '고기 육즙 살리는 꿀팁 공유합니다',
      author: '요리고수',
      content: '고기 굽기 전 30분 실온 보관이 핵심! 자세한 내용은...',
      image: '💡',
      likes: 201,
      comments: 34,
      tags: ['꿀팁', '요리'],
      isHot: false,
      time: '2일 전'
    },
    {
      id: 5,
      category: 'free',
      title: '오늘 점심 뭐 먹을까요?',
      author: '점심고민',
      content: '한우 vs 돼지고기 투표 좀 해주세요 ㅠㅠ',
      image: '🤔',
      likes: 67,
      comments: 89,
      tags: ['잡담'],
      isHot: false,
      time: '3시간 전'
    }
  ];

  const HomePage = () => (
    <div className="space-y-6">
      {/* 고기 정보 카드 */}
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
        <div className="text-center text-7xl mb-4">🐂</div>
        <h2 className="text-lg font-bold text-gray-800 mb-3">안녕하세요?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          해당 고기는 <span className="font-bold text-green-600">2024년 10월</span>에 도축된 <span className="font-bold text-green-600">1++한우</span>입니다. 
          <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">동물복지 인증 농장</span>
        </p>
        <p className="text-sm text-gray-600 mb-4">
          더 자세한 정보를 보고 싶으면 더보기를 눌러주세요.
        </p>
        <button 
          onClick={() => setSelectedProduct(products[0])}
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition-colors mb-3"
        >
          더보기
        </button>
        
        {/* 고기 평가하기 버튼 */}
        <button 
          onClick={() => setActiveTab('evaluate')}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-colors flex items-center justify-center gap-2"
        >
          <Star size={20} className="fill-white" />
          고기 평가하고 100P 받기
        </button>
      </div>

      {/* 회원가입 CTA 배너 */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 text-8xl opacity-20">🎁</div>
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">회원가입하고 1,000P 받기!</h3>
          <p className="text-sm opacity-90 mb-4">평가하고, 공유하고, 저탄소 축산물 구매까지!</p>
          <div className="flex gap-2">
            <button className="flex-1 bg-white text-purple-600 font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors">
              회원가입 하기
            </button>
            <button className="flex-1 bg-white/20 backdrop-blur text-white font-semibold py-3 rounded-xl hover:bg-white/30 transition-colors">
              둘러보기
            </button>
          </div>
        </div>
      </div>

      {/* 축산이음 소개 배너 */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="text-center mb-3">
          <h2 className="text-2xl font-bold mb-2">🐂 축산이음</h2>
          <div className="inline-block bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold mb-3">
            축산물 이력제의 혁신, 소비자 네트워크형 플랫폼
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <div className="text-2xl mb-1">⭐</div>
            <div className="font-semibold">소비자 평가</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <div className="text-2xl mb-1">🎁</div>
            <div className="font-semibold">포인트 보상</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <div className="text-2xl mb-1">🌱</div>
            <div className="font-semibold">저탄소 인증</div>
          </div>
        </div>
      </div>

      {/* 내 포인트 */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Gift className="text-amber-600" size={32} />
          <div>
            <div className="text-sm text-gray-600">내 포인트</div>
            <div className="text-2xl font-bold text-amber-600">{userPoints}P</div>
          </div>
        </div>
        <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
          사용하기
        </button>
      </div>

      {/* AI 추천 */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="text-blue-600" size={24} />
          <h3 className="font-bold text-gray-800">AI 맞춤 추천</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          당신은 <span className="font-semibold text-blue-600">지방 적은 부위</span>를 선호하시네요!
        </p>
        <div className="bg-white rounded-xl p-3 text-sm">
          추천: 한우 안심, 돼지 뒷다리살
        </div>
      </div>

      {/* 인기 축산물 */}
      <div>
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <Star className="text-yellow-500" size={20} />
          인기 축산물
        </h3>
        <div className="space-y-3">
          {products.map(product => (
            <div 
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="bg-white rounded-xl p-4 border-2 border-gray-100 hover:border-green-300 transition-all cursor-pointer"
            >
              <div className="flex gap-4">
                <div className="text-5xl">{product.image}</div>
                <div className="flex-1">
                  <div className="flex gap-2 mb-1">
                    {product.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                        {tag === '저탄소' && <Leaf size={12} />}
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="font-bold text-gray-800">{product.name}</h4>
                  <p className="text-sm text-gray-500">{product.origin} · {product.farmer}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">({product.reviews}개 평가)</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 인기 레시피 */}
      <div>
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
          <ChefHat className="text-orange-500" size={20} />
          인기 레시피
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {recipes.map(recipe => (
            <div key={recipe.id} className="bg-white rounded-xl overflow-hidden border-2 border-gray-100">
              <div className="text-6xl p-4 bg-gray-50 text-center">{recipe.image}</div>
              <div className="p-3">
                <h4 className="font-semibold text-sm mb-1">{recipe.title}</h4>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>❤️ {recipe.likes}</span>
                  <span className="text-green-600 font-semibold">{recipe.points}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProductDetail = () => (
    <div className="space-y-4">
      <button 
        onClick={() => setSelectedProduct(null)}
        className="text-green-600 font-semibold"
      >
        ← 돌아가기
      </button>
      
      <div className="text-center text-7xl mb-4">{selectedProduct.image}</div>
      
      <div className="bg-white rounded-xl p-5 border-2 border-gray-100">
        <div className="flex gap-2 mb-2">
          {selectedProduct.tags.map((tag, i) => (
            <span key={i} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
              {tag === '저탄소' && <Leaf size={12} />}
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-1">{selectedProduct.name}</h2>
        <p className="text-gray-600 mb-3">{selectedProduct.origin} · {selectedProduct.farmer}</p>
        <div className="flex items-center gap-2">
          <Star size={20} className="text-yellow-500 fill-yellow-500" />
          <span className="text-xl font-bold">{selectedProduct.rating}</span>
          <span className="text-gray-400">({selectedProduct.reviews}개 평가)</span>
        </div>
      </div>

      {/* 평가 항목 */}
      <div className="bg-white rounded-xl p-5 border-2 border-gray-100">
        <h3 className="font-bold mb-4">소비자 평가</h3>
        {[
          { label: '맛', value: selectedProduct.taste },
          { label: '육색', value: selectedProduct.color },
          { label: '고소함', value: selectedProduct.aroma },
          { label: '지방 적절성', value: selectedProduct.fat }
        ].map((item, i) => (
          <div key={i} className="mb-3 last:mb-0">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-sm font-bold text-green-600">{item.value}/5.0</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${(item.value / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 평가하기 버튼 */}
      <button 
        onClick={() => {
          setUserPoints(prev => prev + 100);
          alert('평가 완료! 100포인트가 적립되었습니다 🎉');
        }}
        className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-colors"
      >
        이 제품 평가하고 100P 받기
      </button>

      {/* 농가 스토리 */}
      <div className="bg-amber-50 rounded-xl p-5 border-2 border-amber-200">
        <h3 className="font-bold mb-2 flex items-center gap-2">
          <Users size={20} className="text-amber-600" />
          농가 스토리
        </h3>
        <p className="text-sm text-gray-700 mb-3">
          {selectedProduct.farmer}에서 정성껏 키운 축산물입니다. 저탄소 사육으로 환경도 생각합니다.
        </p>
        <button className="text-sm text-amber-700 font-semibold">
          영상 보기 →
        </button>
      </div>
    </div>
  );

  const RecipePage = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">레시피 & 후기</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
          <Camera size={16} />
          작성
        </button>
      </div>

      {/* 이번달 우수레시피 챌린지 */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Star size={24} className="fill-white" />
          <h3 className="text-xl font-bold">이번 달 우수레시피</h3>
        </div>
        <p className="text-sm opacity-90 mb-3">도전하고 20,000포인트를 받아보세요!</p>
        <button className="w-full bg-white text-purple-600 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors">
          우수레시피 도전하기
        </button>
      </div>

      {/* 우수 레시피 목록 */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
        <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
          🏆 이번 달 우수레시피
        </h3>
        <div className="space-y-2">
          {[
            { title: '한우 등심 스테이크 완벽 가이드', author: '셰프김', likes: 892, points: '20,000P 수상' },
            { title: '돼지고기 김치찌개 황금레시피', author: '요리왕', likes: 756, points: '20,000P 수상' },
            { title: '저탄소 한우로 만든 소불고기', author: '착한요리사', likes: 634, points: '20,000P 수상' }
          ].map((recipe, i) => (
            <div key={i} className="bg-white rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm">{recipe.title}</span>
                <span className="text-xs bg-amber-500 text-white px-2 py-1 rounded-full font-bold">
                  🏆 {i + 1}위
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>{recipe.author} · ❤️ {recipe.likes}</span>
                <span className="text-amber-600 font-bold">{recipe.points}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-3">
        {recipes.map(recipe => (
          <div key={recipe.id} className="bg-white rounded-xl p-4 border-2 border-gray-100">
            <div className="flex gap-4">
              <div className="text-5xl">{recipe.image}</div>
              <div className="flex-1">
                <h3 className="font-bold mb-1">{recipe.title}</h3>
                <p className="text-sm text-gray-500 mb-2">by {recipe.author}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">❤️ {recipe.likes}개</span>
                  <span className="text-sm text-green-600 font-semibold">{recipe.points}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MarketPage = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <ShoppingBag size={28} />
        저탄소 마켓
      </h2>
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
        <p className="text-sm text-gray-700">
          평가 활동으로 모은 포인트로 저탄소 축산물을 구매하세요! (구매가의 최대 60%까지 사용 가능)
        </p>
      </div>
      <div className="space-y-3">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-xl p-4 border-2 border-gray-100">
            <div className="flex gap-4">
              <div className="text-5xl">{product.image}</div>
              <div className="flex-1">
                <h3 className="font-bold">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.origin}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold">15,000원</span>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    포인트 사용
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CommunityPage = () => {
    const categories = [
      { id: 'all', icon: '📋', label: '전체' },
      { id: 'review', icon: '🥩', label: '후기' },
      { id: 'farm', icon: '👨‍🌾', label: '농가' },
      { id: 'challenge', icon: '🌱', label: '챌린지' },
      { id: 'tip', icon: '💡', label: '꿀팁' },
      { id: 'free', icon: '💬', label: '자유' }
    ];

    const filteredPosts = communityCategory === 'all' 
      ? communityPosts 
      : communityPosts.filter(post => post.category === communityCategory);

    const hotPosts = communityPosts.filter(post => post.isHot);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">커뮤니티</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
            <Camera size={16} />
            글쓰기
          </button>
        </div>

        {/* 광고 배너 */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-600 rounded-xl p-5 text-white relative overflow-hidden">
          <div className="absolute top-2 right-2 bg-white/20 backdrop-blur px-2 py-1 rounded text-xs">
            AD
          </div>
          <div className="flex items-center gap-4">
            <div className="text-5xl">❄️</div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">삼성 비스포크 냉장고</h3>
              <p className="text-sm opacity-90 mb-2">고기 신선하게 보관하세요</p>
              <button className="bg-white text-slate-800 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors">
                자세히 보기 →
              </button>
            </div>
          </div>
        </div>

        {/* HOT 게시글 */}
        {communityCategory === 'all' && (
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-4 text-white">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              🔥 실시간 HOT
            </h3>
            <div className="space-y-2">
              {hotPosts.map(post => (
                <div key={post.id} className="bg-white/20 rounded-lg p-3 backdrop-blur">
                  <div className="font-semibold text-sm mb-1">{post.title}</div>
                  <div className="flex items-center gap-3 text-xs opacity-90">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                    <span>{post.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 카테고리 버튼 */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCommunityCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                communityCategory === cat.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* 게시글 목록 */}
        <div className="space-y-3">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white rounded-xl p-4 border-2 border-gray-100 hover:border-green-200 transition-all">
              <div className="flex gap-4">
                <div className="text-5xl flex-shrink-0">{post.image}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-gray-800 line-clamp-1">{post.title}</h3>
                    {post.isHot && <span className="text-red-500 text-xs font-bold flex-shrink-0">🔥 HOT</span>}
                  </div>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.content}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Heart size={16} />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={16} />
                        {post.comments}
                      </span>
                    </div>
                    <span className="text-xs">{post.author} · {post.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ProfilePage = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">내 프로필</h2>
      
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
        <div className="text-center mb-4">
          <div className="w-20 h-20 bg-white rounded-full mx-auto mb-3 flex items-center justify-center text-4xl">
            😊
          </div>
          <h3 className="text-xl font-bold">고기러버</h3>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{userPoints}</div>
            <div className="text-sm opacity-80">포인트</div>
          </div>
          <div>
            <div className="text-2xl font-bold">24</div>
            <div className="text-sm opacity-80">평가</div>
          </div>
          <div>
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm opacity-80">레시피</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 border-2 border-gray-100">
        <h3 className="font-bold mb-3">내 선호도 분석</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>지방 선호도</span>
            <span className="font-semibold text-green-600">3.2/5.0 (낮음)</span>
          </div>
          <div className="flex justify-between">
            <span>고소함 선호도</span>
            <span className="font-semibold text-green-600">4.8/5.0 (높음)</span>
          </div>
          <div className="flex justify-between">
            <span>선호 축종</span>
            <span className="font-semibold text-green-600">한우 &gt; 돼지</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-5 border-2 border-blue-200">
        <h3 className="font-bold mb-2">추천 부위</h3>
        <p className="text-sm text-gray-700">
          당신의 선호도에 맞는 부위: <span className="font-semibold text-blue-600">한우 안심, 채끝</span>
        </p>
      </div>
    </div>
  );

  const EvaluationPage = () => {
    const StarRating = ({ value, onChange, label }) => (
      <div className="mb-5">
        <label className="block font-semibold mb-2 text-gray-800">{label}</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onClick={() => onChange(star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={40}
                className={star <= value ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
              />
            </button>
          ))}
        </div>
      </div>
    );

    const OptionSelect = ({ value, onChange, label, options }) => (
      <div className="mb-5">
        <label className="block font-semibold mb-2 text-gray-800">{label}</label>
        <div className="grid grid-cols-2 gap-2">
          {options.map(option => (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={`py-3 px-4 rounded-xl font-medium transition-all ${
                value === option
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );

    const handleSubmit = () => {
      const { taste, color, texture, fat, aroma, overall, repurchase } = evaluation;
      
      if (!taste || !color || !texture || !fat || !aroma || !overall || !repurchase) {
        alert('모든 항목을 평가해주세요! 😊');
        return;
      }

      setUserPoints(prev => prev + 100);
      alert('평가 완료! 🎉\n100포인트가 적립되었습니다!');
      setEvaluation({
        taste: 0,
        color: '',
        texture: '',
        fat: '',
        aroma: 0,
        overall: 0,
        repurchase: 0
      });
      setActiveTab('home');
    };

    return (
      <div className="space-y-4 pb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">고기 평가하기</h2>
          <span className="text-green-600 font-bold">+100P</span>
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
          <p className="text-sm text-gray-700">
            솔직한 평가가 좋은 축산물을 만듭니다! 😊
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border-2 border-gray-100">
          <StarRating
            label="맛"
            value={evaluation.taste}
            onChange={(v) => setEvaluation({...evaluation, taste: v})}
          />

          <OptionSelect
            label="육색"
            value={evaluation.color}
            onChange={(v) => setEvaluation({...evaluation, color: v})}
            options={['흑색', '흑갈색', '검붉은색', '붉은색']}
          />

          <OptionSelect
            label="질긴 정도"
            value={evaluation.texture}
            onChange={(v) => setEvaluation({...evaluation, texture: v})}
            options={['질김', '조금 질김', '보통', '부드러움', '매우 부드러움']}
          />

          <OptionSelect
            label="지방 양"
            value={evaluation.fat}
            onChange={(v) => setEvaluation({...evaluation, fat: v})}
            options={['매우 적음', '적음', '보통', '많음', '매우 많음']}
          />

          <StarRating
            label="고소함"
            value={evaluation.aroma}
            onChange={(v) => setEvaluation({...evaluation, aroma: v})}
          />

          <StarRating
            label="고기 총평"
            value={evaluation.overall}
            onChange={(v) => setEvaluation({...evaluation, overall: v})}
          />

          <StarRating
            label="재구매 의사"
            value={evaluation.repurchase}
            onChange={(v) => setEvaluation({...evaluation, repurchase: v})}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-colors"
        >
          평가 제출하고 100P 받기
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      {/* 헤더 */}
      <div className="bg-white border-b-2 border-gray-100 p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-800">🥩 축산이음</h1>
      </div>

      {/* 콘텐츠 */}
      <div className="p-4">
        {activeTab === 'home' && !selectedProduct && <HomePage />}
        {activeTab === 'home' && selectedProduct && <ProductDetail />}
        {activeTab === 'evaluate' && <EvaluationPage />}
        {activeTab === 'recipe' && <RecipePage />}
        {activeTab === 'community' && <CommunityPage />}
        {activeTab === 'market' && <MarketPage />}
        {activeTab === 'profile' && <ProfilePage />}
      </div>

      {/* 하단 네비게이션 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 max-w-md mx-auto">
        <div className="grid grid-cols-5 gap-1 p-2">
          {[
            { id: 'home', icon: Home, label: '홈' },
            { id: 'recipe', icon: ChefHat, label: '레시피' },
            { id: 'community', icon: MessageCircle, label: '커뮤니티' },
            { id: 'market', icon: ShoppingBag, label: '마켓' },
            { id: 'profile', icon: User, label: '프로필' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedProduct(null);
              }}
              className={`flex flex-col items-center gap-1 py-2 px-2 rounded-lg transition-colors ${
                activeTab === tab.id 
                  ? 'bg-green-100 text-green-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <tab.icon size={22} />
              <span className="text-xs font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LivestockPlatform;