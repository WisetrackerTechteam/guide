# Purchase Key
* [Product](./purchase.md#Product)
* [Multi Variable](./purchase.md#Multi-Variable)
* [Ecommerce](./purchase.md#Ecommerce)
* [Travel](./purchase.md#Travel)
* [Entertainment](./purchase.md#Entertainment)
* [Game](./purchase.md#Game)
* [Fintech](./purchase.md#Fintech)
* [Mobility](./purchase.md#Mobility)

### <a id="Product"></a> Product
| 분석항목 | 키 | 설명 |
| :------ | :------ | :------ |
| 상품카테고리(대) | pg1 | 구매한 상품의 카테고리 ( 대 )  |
| 상품카테고리(중) | pg2 | 구매한 상품의 카테고리 ( 중 )  |
| 상품카테고리(소) | pg3 | 구매한 상품의 카테고리 ( 소 )  |
| 상품카테고리(세) | pg4 | 구매한 상품의 카테고리 ( 세 )  |
| 카테고리명 | pngNm | 상품의 카테고리명 |
| 상품 | pnc | 구매한 상품 코드   |
| 상품명 | pncNm | 구매한 상품명 |
| 상품 Attribute 1 | pnAtr1 | 상품 속성 1 |
| 상품 Attribute 2 | pnAtr2 | 상품 속성 2 |
| 상품 Attribute 3 | pnAtr3 | 상품 속성 3 |
| 상품 Attribute 4 | pnAtr4 | 상품 속성 4 |
| 상품 Attribute 5 | pnAtr5 | 상품 속성 5 |
| 상품 Attribute 6 | pnAtr6 | 상품 속성 6 |
| 상품 Attribute 7 | pnAtr7 | 상품 속성 7 |
| 상품 Attribute 8 | pnAtr8 | 상품 속성 8 |
| 상품 Attribute 9 | pnAtr9 | 상품 속성 9 |
| 상품 Attribute 10 | pnAtr10 | 상품 속성 10 |
| 매출액 | amt | 구매 전환 발생시 매출액을 분석 |
| 통화코드 | curcy | 구매 전환 발생시 매출액에 대한 통화 코드  |
| 상품별 확장 금액 분석 | optAmt | |
| 주문상품 수량 | ea | 구매 전환 발생시 상품별 구매된 수량을 분석 |
| 환불금액 | rfnd | 환불이 발생한 경우, 매출액은 넣지 않고 환불 금액을 설정 |
| 환불상품 수량 | rfea | 환불이 발생한 경우, 주문 상품 수량은 넣지 않고 환불 수량을 설정 |
| 상품 주문번호 | ordPno | 상품 STORE 별 주문 번호 설정 |
| 통합 주문 번호 | ordNo | 구매 전환 발생 횟수를 분석|
| Npay Transaction Id | npayTid | Npay 를 사용하여 간편 결제시, Npay 에서 발급해준 Tid 값을 설정|
| 통화단위 | curcy | 매출액이 발생한 통화 단위|

### <a id="Multi-Variable"></a> Multi Variable
| 분석항목 | 키 | 설명 |
| :------ | :------ | :------ |
| Multi Variable 1  | mvt1  | 구매와 연관된 정보를 전달하여 전달된 값 기준으로의 구매 데이터 분석 |
| Multi Variable 2  | mvt2  | 구매와 연관된 정보를 전달하여 전달된 값 기준으로의 구매 데이터 분석 |
| Multi Variable 3  | mvt3  | 구매와 연관된 정보를 전달하여 전달된 값 기준으로의 구매 데이터 분석 |
| Multi Variable 4  | mvt4  | 구매와 연관된 정보를 전달하여 전달된 값 기준으로의 구매 데이터 분석 |
| Multi Variable 5  | mvt5  | 구매와 연관된 정보를 전달하여 전달된 값 기준으로의 구매 데이터 분석 |
| Multi Variable 6  | mvt6  | 구매와 연관된 정보를 전달하여 전달된 값 기준으로의 구매 데이터 분석 |
| Multi Variable 7  | mvt7  | 구매와 연관된 정보를 전달하여 전달된 값 기준으로의 구매 데이터 분석 |
| Multi Variable 8  | mvt8  | 구매와 연관된 정보를 전달하여 전달된 값 기준으로의 구매 데이터 분석 |
| Multi Variable 9  | mvt9  | 구매와 연관된 정보를 전달하여 전달된 값 기준으로의 구매 데이터 분석 |
| Multi Variable 10 | mvt10 | 구매와 연관된 정보를 전달하여 전달된 값 기준으로의 구매 데이터 분석 |
| 기여 검색어 분석  	| useLatestIkwd  | 사용자가 구매 이전에 마지막으로 검색한 검색어를 같이 사용할지 여부를 선택		|
| Multi Variable 1  | useLatestMvt1  | 사용자가 구매 이전에 마지막으로 검색한 MVT1 데이터를 같이 사용할지 여부 선택 |
| Multi Variable 2  | useLatestMvt2  | 사용자가 구매 이전에 마지막으로 검색한 MVT2 데이터를 같이 사용할지 여부 선택 |
| Multi Variable 3  | useLatestMvt3  | 사용자가 구매 이전에 마지막으로 검색한 MVT3 데이터를 같이 사용할지 여부 선택 |
| Multi Variable 4  | useLatestMvt4  | 사용자가 구매 이전에 마지막으로 검색한 MVT4 데이터를 같이 사용할지 여부 선택 |
| Multi Variable 5  | useLatestMvt5  | 사용자가 구매 이전에 마지막으로 검색한 MVT5 데이터를 같이 사용할지 여부 선택 |
| Multi Variable 6  | useLatestMvt6  | 사용자가 구매 이전에 마지막으로 검색한 MVT6 데이터를 같이 사용할지 여부 선택 |
| Multi Variable 7  | useLatestMvt7  | 사용자가 구매 이전에 마지막으로 검색한 MVT7 데이터를 같이 사용할지 여부 선택 |
| Multi Variable 8  | useLatestMvt8  | 사용자가 구매 이전에 마지막으로 검색한 MVT8 데이터를 같이 사용할지 여부 선택 |
| Multi Variable 9  | useLatestMvt9  | 사용자가 구매 이전에 마지막으로 검색한 MVT9 데이터를 같이 사용할지 여부 선택 |
| Multi Variable 10 | useLatestMvt10 | 사용자가 구매 이전에 마지막으로 검색한 MVT10 데이터를 같이 사용할지 여부 선택 |

### <a id="Ecommerce"></a> Ecommerce
| 분석항목 | 키 |
| :------ | :------ | 
| 브랜드명 | s_brandNm |  
| 기획전명 | s_exhibitNm |
| 이벤트명 | s_eventNm |  
| 버튼명 | s_buttonName |
| 배너명 | s_bannerName |
| 메뉴명 | s_menuName |  
| 환불 코드 | s_refundTp |
| 쿠폰 타입 | s_coupon |  

### <a id="Travel"></a> Travel
| 분석항목 | 키 |
| :------ | :------ |
| 국가 | t_cntr |
| 도시 | t_city |
| 결제수단명 | t_payTpNm |
| 결제수단 타입 | t_payTp |
| 도착공항 | t_destination |
| 지역a | t_areaA |
| 지역b | t_areaB |
| 호텔명 | t_hotelNm |
| 호텔 코드 | t_hotel |
| 서브타입a | t_hotelSubA |
| 서브타입b | t_hotelSubB |
| 날짜a | t_dateA |
| 날짜b | t_dateB |
| 출발공항 | t_departureNm |
| 공항 코드 | t_departure |
| 항공기 클래스 a | t_aircraftClassA |
| 항공기 클래스 b | t_aircraftClassB |
| 항공사 a | t_airlineA |
| 항공사 b | t_airlineB |
| 호텔 성급 | t_hotelClass |
| 부킹수 분포 | t_bookingCnt |
| 부킹간격 분포 | t_bookingIntv |
| 부킹 소요시간 분포 | t_bookingTm |
| 부킹코드 | t_booking |
| 취소ID | t_cancelId |
| 이벤트명 | t_eventNm |
| 기획전명 | t_exhibitNm |
| 카테고리명 | t_categoryNm |
| 통화코드 | t_curcy |

### <a id="Entertainment"></a> Entertainment
| 분석항목 | 키 |
| :------ | :------ |
| 트라이얼 수단 | e_trial | 
| 구독 수단 | e_subscribe | 
| 구독 상품명 | e_pncNm | 
| 구독 상품 코드 | e_pnc | 
| 구독수 분포 |  | 
| 구독간격 분포 |  | 
| 구독 소요시간 분포 |  | 
| 구독ID | e_subscribeId | 
| 미디어명 | e_mediaNm | 
| 미디어 코드 | e_media | 
| 아티스트명 | e_artistNm | 
| 아티스트 코드 | e_artist | 
| 카테고리명 | e_pngNm | 
| 카테고리 코드 | e_png | 
| 앨범명 | e_albumNm | 
| 앨범 코드 | e_album | 
| 감독명 | e_directorNm | 
| 감독 코드 | e_director | 
| 배우명 | e_actorNm | 
| 배우 코드 | e_actor | 
| 장르명 | e_genreNm | 
| 장르 코드 | e_genre | 
| 시리즈명 | e_seriseNm | 
| 시리즈 코드 | e_serise | 
| 기획전명 | e_exhibitNm | 
| 이벤트명 | e_eventNm | 
| 컨텐츠 언어 | e_language | 
| 서브타입a | e_languageSubA | 
| 서브타입b | e_languageSubB | 

### <a id="Game"></a> Game
| 분석항목 | 키 |
| :------ | :------ |
| 인앱 광고명 | g_inAppAd |
| 튜토리얼명 | g_tutorial |
| 캐릭터명 | g_characterNm |
| 캐릭터 타입 | g_characterTp |
| 스테이지명 | g_stageNm |
| 보스명 | g_bossNm |
| 크레딧명 | g_creditNm |
| 이벤트명 | g_eventNm |
| 레벨 | g_level |
| 서브타입a | g_levelSubA |
| 서브타입b | g_levelSubB |

### <a id="Fintech"></a> Fintech
| 분석항목 | 키 |
| :------ | :------ |
| 대출명 | f_loanNm |
| 대출ID | f_loanId |
| 상환명 | f_repaymentNm |
| 상환ID | f_repaymentId |
| 투자상품명 | f_investmentNm |
| 투자상품코드 | f_investment |
| 투자ID | f_investmentId |
| 송금ID | f_remittanceId |
| 환전ID | f_exchangeId |
| 보험상품명 | f_insuranceNm |
| 보험상품코드 | f_insurance |
| 보험가입ID | f_insuranceId |
| 서브타입a | f_insuranceSubA |
| 서브타입b | f_insuranceSubB |
| 결제수단명 | f_payTpNm |
| 결제수단 타입 | f_payTp |
| 이벤트명 | f_eventNm |
| 통화코드a | f_curcyA |
| 통화코드b | f_curcyB |
| 금융사a | f_financialA |
| 금융사b | f_financialB |

### <a id="Mobility"></a> Mobility
| 분석항목 | 키 |
| :------ | :------ |
| 호출ID | m_callId |
| 운전자ID | m_driverId |
| 차량명 | m_carNm |
| 차량ID | m_carId |
| 서브타입 a | m_carIdSubA |
| 지역a | m_areaA |
| 지역b | m_areaB |
| 결제수단명 | m_payTpNm |
| 결제수단 타입 | m_payTp |
| 즐겨찾기 타입 | m_favorite |
| 경로 안내 횟수 분포 | |
| 경로 안내 간격 분포 | |
| 이벤트명 | m_eventNm |
| 호출횟수 분포 | |
| 호출간격 분포 | |
| 호출 소요시간 분포 | |
