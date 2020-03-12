### 1. Javascript Librarytest123

#### 1.1 Javascript Library는?

Javascript Library는 Web Page에서 Native SDK로 데이터를 전달할 수 있도록 해주는 Client Side Library 입니다
이 Library는 분석 대상 앱의 웹 컨텐츠를 분석하고자 하는 경우에 사용되며, 사용하기 이전에 반드시 Native SDK의 설치가 선행되어야 합니다
다른 플렛폼 환경을 선택하여 Native SDK 설치 방법을 확인 하세요

#### 1.2 Library 확인

##### iOS

dop-native-sdk-inf.js 스크린캡처

##### Android

### 2. 기분 분석

앱의 실행 및 페이지 분석을 위해서는 각 화면의 이동시에 호출되는 Callback 함수에 다음과 같은 코드의 적용이 필요합니다
아래의 2가지 코드를 적용후에는 기본적으로 분석되는 범위는 대략적으로 다음과 같습니다

- 앱 실행 및 방문수, 일/주/월순수방문수 등 방문과 관련된 지표
- 페이지뷰, 페이지 체류시간
- 통신사, 단말기, 국가 등 방문자의 단말기 환경으로 부터 추출될 수 있는 지표

Javascpirt의 화면 로딩이 완료되는 시점에 다음과 같이 기본적인 페이지 트래픽 분석을 위한 코드를 적용합니다.

```javascript
<script type="text/javascript">DOT.onStartPage(screen);</script>
```

### 3. 고급 컨텐츠 분석 ( optional )

in-App 에서 발생하는 다양한 이벤트를 분석하기 위해서는 분석 대상 앱에서 해당 이벤트가 발생된 시점에,
SDK에게 해당 정보를 전달해야 합니다
이어지는 내용에서는 주요 이벤트들의 분석 방법에 대해서 자세하게 설명합니다

#### 3.1 로그인 분석

- 로그인 이벤트 분석

분석 대상 앱에 로그인 기능이 있는 경우에, 로그인 이벤트에 대한 발생 여부를 분석할 수 있습니다
로그인 처리 완료후, 로그인 완료 페이지에 아래와 같이 분석 코드를 적용합니다

```javascript
<script type="text/javascript">
  var screen = new Object(); screen["pi"] = "LIR"; DOT.logScreen(screen);
</script>
```

- 회원 분석

로그인 완료 이벤트 분석시, 현재 로그인한 사용자의 다양한 정보를 분석할 수 있습니다
로그인 완료에 대한 처리 완료후, 아래와 같이 분석 코드를 적용합니다

```javascript
<script type="text/javascript">
  DOT.setUser(User.setGender("M") .setAttr1("user Attr1") .setAge("A") );
</script>
```

회원 분석과 관련되어 제공되는 분석 항목은 다음과 같습니다

| Class 이름 |      Method 이름      |                   파라미터                   |
| :--------: | :-------------------: | :------------------------------------------: |
|    User    |  setMember(isMember)  |        회원여부를 나타내는 Y,N값 전달        |
|    User    | setMemberGrade(grade) |       회원등급을 나타내는 코드값 전달        |
|    User    |  setMemberId(userId)  |         회원의 로그인 아이디를 전달          |
|    User    |   setGender(gender)   | 회원 성별을 나타내는 M,F,U 중 한가지 값 전달 |
|    User    |      setAge(age)      |       회원 연령을 나타내는 코드값 전달       |
|    User    |    setAttr1(attr)     |       회원 속성#1 의미하는 코드값 전달       |
|    User    |    setAttr2(attr)     |       회원 속성#2 의미하는 코드값 전달       |
|    User    |    setAttr3(attr)     |       회원 속성#3 의미하는 코드값 전달       |
|    User    |    setAttr4(attr)     |       회원 속성#4 의미하는 코드값 전달       |
|    User    |    setAttr5(attr)     |       회원 속성#5 의미하는 코드값 전달       |

#### 3.2 Page 분석

분석 가능 Page Key 해당 목록에 들어있는 key 값에 한해서 분석이 가능합니다. 분석을 희망하는 key 값을 확인후 적용해 주세요.

(1) Page Identiy 분석

앱에 존재하는 각 페이지를 의미하는 Identity를 사용자가 정의하고, 각 화면들에 정의된 Identity를 적용하면,
앱에서 가장 사용 빈도가 높은 화면별 랭킹을 알 수 있습니다
Identity값은 **AlphaNumeric 형태를 가지는 최대길이 8자 미만의 코드값** 이어야 합니다

```javascript
<script type="text/javascript">
  var screen = new Object(); screen["pi"] = "Your Page Identity Value";
  DOT.logScreen(screen);
</script>
```

(2) 상품 페이지 분석

e-commerce 앱의 경우 상품 상세 페이지에 분석코드를 적용하여, 상품별 조회수를 분석합니다.
상품 상세 페이지에 아래와 같이 분석 코드를 적용하세요.

```javascript
<script type="text/javascript">
  var screen = new Object(); screen["pi"] = "PDV"; screen["pg1"] =
  "상품카테고리(대)"; screen["pnc"] = "상품코드"; screen["pnAtr1"] =
  "상품속성#1" DOT.logScreen(screen);
</script>
```

(3) Contents Path 분석

앱에 존재하는 각 페이지에 Hierarchical 한 Contents Path값을 적용하면,
각 컨텐츠의 사용 비율을 카테고리별로 그룹화 하여 분석이 가능합니다
Contents Path는 **'^'** 문자를 구분자로 하고, Contents Path의 시작은 **^ 문자로 시작** 되어야 합니다
또한 Contents Path로 전달되는 값에는 **'** 와 **"** 기호는 사용할 수 없습니다

```javascript
<script type="text/javascript">
  var screen = new Object(); screen["cp"] = "^메인^계정정보 수정";
  DOT.logScreen(screen);
</script>
```

(4) Multi Variables 분석( 사용자 정의 변수 )

Multi Variables 분석 항목은 사용자가 그 항목에 전달할 값을 정의하여 사용이 가능합니다.
비즈니스에서 필요한 분석 항목을 SDK API 함수로 전달하고, 그렇게 전달된 값을 기준으로 페이지뷰수, 방문수등을 측정하고 보여줍니다
Multi Variables 의 분석값은 값에는 **'** 와 **"** 기호는 사용할 수 없습니다 ( 영어,숫자,한글만 사용 가능 )

```javascript
<script type="text/javascript">
  var screen = new Object(); screen["mvt1"] = "page mvt 1"; screen["mvt2"] =
  "page mvt 2"; screen["mvt3"] = "page mvt 3"; screen["mvt4"] = "page mvt 4";
  screen["mvt5"] = "page mvt 5"; DOT.logScreen(screen);
</script>
```

(5) 내부 검색어 분석

앱에 검색기능이 있는 경우, 사용자가 입력한 검색어와 검색한 카테고리, 검색 결과수등을 분석하면
검색 기능의 활용성을 측정할 수 있습니다
검색 결과가 보여지는 화면에 다음과 같이 분석 코드를 적용합니다

```javascript
<script type="text/javascript">
  // 사용자가 통합 검색 카테고리에서 청바지 검색어로 1200개의 검색 결과를
  보았을떄 적용 예시 var screen = new Object(); screen["skwd"] = "청바지";
  screen["scart"] = "통합검색"; screen["sresult"] = 1200; DOT.logScreen(screen);
</script>
```

#### 3.3 Click 분석

(1) 검색 결과 클릭 분석

검색 결과 페이지에서 보여지는 많은 검색 결과 항목별 클릭수를 분석합니다.
이 분석 결과를 통해서 검색 결과의 상단에 노출되는 항목들이 적절한지 가늠할 수 있습니다.
검색 결과 페이지에서 특정 항목이 클릭되면, 해당 화면으로 이동하기 이전에 아래와 같이 분석 코드를 적용하세요.

```javascript
<script type="text/javascript">
  var click = new Object(); click["ckTp"] = "SCH"; click["ckData"] = "클릭된
  검색 결과 항목 ID"; DOT.logClick(click);
</script>
```

(2) 장바구니 담긴 상품 분석

e-commerce 관련된 비즈니스의 경우 장바구니에 담긴 상품을 분석할 수 있습니다
장바구니 담기 이벤트 발생시 아래와 같은 코드를 적용하세요

```javascript
<script type="text/javascript">
  var click = new Object(); click["ckTp"] = "SCRT"; click["pg1"] =
  "상품카테고리(대)"; click["pnc"] = "상품코드"; click["pnAtr1"] = "상품속성#1";
  DOT.logClick(click);
</script>
```

(3) 클릭 이벤트 분석

앱에 존재하는 다양한 클릭 요소 ( 배너, 버튼 등 ) 에 대해서, 클릭수를 분석합니다
각 요소가 클릭되는 시점에 아래와 클릭된 요소의 목적지 화면으로 이동하기 이전에 아래와 같은 분석 코드를 적용하세요

```javascript
<script type="text/javascript">
  var click = new Object(); click["ckTp"] = "CKC"; click["ckData"] = "클릭된
  검색 결과 항목 ID"; DOT.logClick(click);
</script>
```

클릭된 요소의 ID값으로 단일 문자열로된 값을 전달하기도 하지만,
앞에서 설명한 **Contents Path 분석** 과 같이, Hierarchical 한 Path값을 전달하여 추후 데이터 조회시 Categorizing 하게 보기도 가능합니다
Hierarchical 한 Path 값을 사용하고자 할때 값에 대한 제약사항은 **Contents Path 분석** 과 동일합니다

- 클릭 이벤트 고급 분석( Multi Variables )

클릭 이벤트 분석시 앞에서 설명한 **Multi Variables 분석** 을 같이 적용하면, **Multi Variables 분석 항목별 클릭수** 를 측정할 수 있습니다
클릭 이벤트가 발생된 시점에 다음과 같이 Multi Variables 값을 같이 SDK에 전달하도록 분석코드를 적용하세요

```javascript
<script type="text/javascript">
  // 클릭 이벤트 분석시 Multi Variables 분석값을 같이 전송하는 예시 var click =
  new Object(); click["ckTp"] = "CKC"; click["ckData"] = "클릭된 검색 결과 항목
  ID"; click["mvt1"] = "page mvt 1" click["mvt2"] = "page mvt 2" click["mvt3"] =
  "page mvt 3" click["mvt4"] = "page mvt 4" click["mvt5"] = "page mvt 5"
  DOT.logClick(click);
</script>
```

#### 3.4 Conversion 분석

- Conversion 분석

앱내에 존재하는 Conversion중 가장 대표적인게 **구매 전환** 을 생각할 수 있습니다.
하지만, 앱내에는 앱이 제공하는 서비스에 따라서 매우 다양한 Conversion이 존재할 수 있습니다.
또한, 이미 정의된 Conversion 일지라도, 서비스의 변화, 시대의 변화애 따라서 새로 정의되어야 하기도 하고, 사용하지 않아서 폐기되기도 합니다.

SDK는 총 80개의 Conversion 을 사용자가 정의하고, 분석 코드를 적용함으로써 앱으로 인하여 발생하는 Conversion 측정이 가능합니다.
이는 \**구매 전환*과는 독립적으로 분석되며, 사용자는 언제든지 분석 코드의 적용 기준을 새로 정의할 수 있습니다.

분석 가능 Conversion Key 해당 목록에 들어있는 key 값에 한해서 분석이 가능합니다. 분석을 희망하는 key 값을 확인후 적용해 주세요.

```javascript
<script type="text/javascript">
  // Micro Conversion #1 번의 사용 예시 var event = new Object(); event["g1"] =
  "goal 1" DOT.logEvent(event)
</script>
```

(1) Conversion 고급 분석( 상품 )

Conversion은 단순하게 발생 횟수를 측정할 수도 있으나,
상품과 연계하여 상품별로 정의한 Conversion의 발생 횟수 측정도 가능합니다
이벤트가 발생한 시점에 아래와 같이 Conversion Data + Product Data 를 SDK로 전달하세요

```javascript
<script type="text/javascript">
  var event = new Object(); event["g1"] = "goal 1" var product : [String: Any] =
  [:] product["pg1"] = "상품카테고리(대)" product["pnc"] = "상품코드"
  product["pnAtr1"] = "상품속성#1" event["product"] = product
  DOT.logEvent(event)
</script>
```

(2) Conversion 고급 분석( Multi Variables )

Multi Variables 항목과 연계하여 Conversion의 발생 횟수 측정도 가능합니다
이벤트가 발생한 시점에 아래와 같이 Conversion Data + Multi Variables Data 를 SDK로 전달하세요

```javascript
<script type="text/javascript">
  var event = new Object(); event["g1"] = "goal 1" event["mvt1"] = "mvt1 1"
  DOT.logEvent(event)
</script>
```

#### 3.5 Purchase 분석

(1) Purchase 분석

앱내에서 발생하는 구매 이벤트를 분석합니다
구매 완료 페이지에서 아래와 같이 구매와 관련된 정보를 SDK에 전달하세요

분석 가능 Purchase Key 해당 목록에 들어있는 key 값에 한해서 분석이 가능합니다. 분석을 희망하는 key 값을 확인후 적용해 주세요.

```javascript
<script type="text/javascript">
  var purchase = new Object(); purchase["ordNo"] = "your Order Number"
  purchase["curcy"] = "KRW" var product1 = new Object(); product1["pg1"] =
  "상품카테고리(대)" product1["pnc"] = "상품코드1" product1["pnAtr1"] =
  "상품속성#1" var product2 = new Object(); product2["pg1"] = "상품카테고리(대)"
  product2["pnc"] = "상품코드2" product2["pnAtr1"] = "상품속성#2" var
  productArray = new Array(); productArray.push(product1)
  productArray.push(product2) purchase["product"] = productArray;
  DOT.logPurchase(purchase);
</script>
```

(2) Purchase 고급 분석( Multi Variables )

Multi Variables 항목과 연계하여 Purchase 분석도 가능합니다
이벤트가 발생한 시점에 아래와 같이 Purchase Data + Multi Variables Data 를 SDK로 전달하세요

```javascript
<script type="text/javascript">
  var purchase = new Object(); purchase["ordNo"] = "your Order Number"
  purchase["curcy"] = "KRW" var product1 = new Object(); product1["pg1"] =
  "상품카테고리(대)" product1["pnc"] = "상품코드1" product1["pnAtr1"] =
  "상품속성#1" var productArray = new Array(); productArray.push(product1)
  purchase["product"] = productArray purchase["mvt1"] = "mvt 1" purchase["mvt2"]
  = "mvt 2" purchase["mvt3"] = "mvt 3" purchase["mvt4"] = "mvt 4"
  purchase["mvt5"] = "mvt 5" DOT.logPurchase(purchase)
</script>
```
