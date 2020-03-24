# Unity 가이드

## 1. 플러그인 설치 (AOS/IOS 공통 설정)

### 1.1 유니티 패키지 다운로드
유니티 플러그인 패키지(RW.unitypackage)를 다운로드 해주세요.

[패키지 다운로드](https://github.com/WisetrackerTechteam/RW-unity-package)

### 1.2 패키지 임포트
-> Unity Tools에서 Assets > Import Package > Custom Package 메뉴 선택
   다운로드 받은 **RW.unitypackage** 파일을 선택해 주세요

## 2. Android 설정

### 2.1 strings.xml 설정
-> /Assets/Plugins/Android/res/values/strings.xml

#### 2.1.1 dotAuthorizationKey 설정
-> 발급받은 App Analytics Key 정보 추가

```xml
<!-- 예시는 샘플 코드이며, 관리자 페이지에서 직접 발급 받은 값을 적용해 주세요  -->
<string-array name="dotAuthorizationKey">
    <item name="usdMode">1</item> // 1. DOT.DOX 2. DOT
    <item name="domain">http://collector.naver.wisetracker.co.kr</item> // DOT END POINT
    <item name="domain_x">http://collector.naver.wisetracker.co.kr</item> // DOX END POINT
    <item name="serviceNumber">103</item>
    <item name="expireDate">14</item>
    <item name="isDebug">false</item>
    <item name="isInstallRetention">true</item>
    <item name="isFingerPrint">true</item>
    <item name="accessToken">access_token_string</item>
</string-array>
```

#### 2.1.2 customKeyList 설정 (필요시 설정)
-> **'#'** 구분자 기준으로 **왼쪽**은 기본 사용되고 있는 키 값 **오른쪽**은 변경하고자 하는 키 값을 적용해주세요.

```xml
<!-- 예시는 디폴트 advtId 키 값을 advt_id 값으로 변경하는 설정입니다. -->
<string-array name="customKeyList">
  <item name="custom_key_value1">advtId#advt_id</item>
</string-array>
```

### 2.2 AndroidManifest.xml 설정 
-> /Assets/Plugins/Android/AndroidManifest.xml

#### 2.2.1 딥링크 설정
-> 딥링크로 진입할 **android:scheme="YOUR_SCHEME"** 스키마와 **android:host="YOUR_HOST"** 호스트를 설정해 주세요.
              
```xml
<!--  예시는 wisetracker://wisetracker.co.kr 링크로 진입시 딥링크 분석이 가능 -->
<activity android:name="kr.co.wisetracker.UnityDeepLink" 
          android:launchMode="singleTop" >
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
      	<!-- 딥링크로 진입될 스키마와 호스트 정보 수정 -->
        <data android:host="wisetracker.co.kr"
              android:scheme="wisetracker" />
    </intent-filter>
</activity>
```

## 3. iOS 설정

### 3.1 CouchbaseLite.framework 추가
제공한 CouchbaseLite.framework파일을 **Targets - General - Frameworkd, Libraries, and embedded Content** 메뉴에 
**Embed & Sign**옵션으로 추가합니다. 

아래와 같이 Unity iOS에 필요한 라이브러리 및 프레임워크 파일이 정상적으로 설치되었음을 확인할 수 있습니다.

![](http://www.wisetracker.co.kr/wp-content/uploads/2020/03/unity_framework_s.png)

### 3.2 Other Linker Flag -ObjC 옵션 추가

**Tagets -  Build Settings - Other Linker Flags**에 **-ObjC** 옵션을 추가합니다.
![](http://www.wisetracker.co.kr/wp-content/uploads/2020/03/unity_otherlinkerflag.png)

### 3.3 info.plist 세팅
XCode 프로젝트의 info.plist 파일에 제공받은 App Analytics Key 정보를 추가합니다
info.plist 파일을 open할때 **list로 보기** 가 아니라 **source로 보기**를 선탁하신뒤, 제공받으신 Key를 **Ctrl+V** 하시면 됩니다
제공받은 Key값은 아래의 예시와 같이 xml 형태를 가지고 있는 데이터 입니다

```xml
<key>dotAuthorizationKey</key>
<dict>
	<key>domain</key>
	<string>http://stg-app-wcs.naver.com</string>
	<key>serviceNumber</key>
	<string>103</string>
	<key>expireDate</key>
	<string>14</string>
	<key>isDebug</key>
	<string>true</string>
	<key>isInstallRetention</key>
	<string>true</string>
	<key>isFingerPrint</key>
	<string>true</string>
	<key>accessToken</key>
	<string></string>
  <key>useMode</key>
  <string>2</string>
</dict>
```

위의 Key 중에 isDebug는 collector 로 전송되는 분석 데이터를 Xcode 에서 확인할 수 있게 해주는 boolean 변수로 사용되고 있습니다
SDK를 적용해야 하는 앱 개발자는 이 값을 true로 설정하고, SDK의 기본 적용 및 추가 분석 코드 적용 과정에서 사용할 수 있습니다
( 예를 들면 이 값을 true로 적용하여, 분석 대상이 되는 앱에 적용하여 build를 하면 Android 의 경우 logcat에서, iOS 의 경우 debug console에서 collector로 전송되는 plain text 형태의 로그 확인이 가능합니다. )
분석 코드 적용이 완료되고, 스토어 배포시에는 해당 필드를 false로 변경하여 배포하는 것을 권장합니다.

http통신을 허용하기 위해 NSAppTransportSecurity 를 아래와 같이 추가합니다


```xml
<key>NSAppTransportSecurity</key>
<dict>
	<key>NSAllowsArbitraryLoads</key>
	<true/>
</dict>
```
## 4. 초기화
유니티 앱 실행시 최초 실행되는 MonoBehavior 상속받아 구현된 MainScene 클래스의 Awake() 함수에 다음과 같은 초기화 코드를 삽입해 주세요.

### 4.1 초기화 호출

```c#
void Awake() 
{
    #if UNITY_ANDROID && !UNITY_EDITOR
        // for android
    #elif UNITY_IOS && !UNITY_EDITOR 
        // for ios
        DOT.initialization();
    #endif
}
```

### 4.2 체류 시간 분석

```c#
void Start() 
{
    // 씬 시작시
    // 체류 시간 분석을 위한 시간(분 단위)을 넣어주세요
    // 예) 15분 단위로 체류 페이지 자동 전송
    DOT.onPlayStart(15);	
}
```

```c#
void OnDestroy() 
{
    // 씬 종료시
    DOT.onPlayStop();
}
```

```c#
void OnApplicationPause(bool pauseStatus)
{
    if (pauseStatus)
    {
    	// 백그라운드 진입시
    	DOT.onPlayStop();
    }
}
```

## 5. 고급 컨텐츠 분석 (optional)

in-App 에서 발생하는 다양한 이벤트를 분석하기 위해서는 분석 대상 앱에서 해당 이벤트가 발생된 시점에, SDK에게 해당 정보를 전달해야 합니다.
이어지는 내용에서는 주요 이벤트들의 분석 방법에 대해서 자세하게 설명합니다.

### 5.1 회원 분석
사용자의 다양한 정보를 분석할 수 있습니다

```java 
DOT.setUser(
    new User.Builder()
    .setGender("M")
    .setAge("A")
    .setAttr1("attr1")
    .build()
);
```

회원 분석과 관련되어 제공되는 분석 항목은 다음과 같습니다

| Class 이름 | Method 이름 | 파라미터 |
| :------: | :------: | :------: |
| User | setMember(isMember) |  회원여부를 나타내는 Y,N값 전달 |
| User | setMemberGrade(grade) | 회원등급을 나타내는 코드값 전달 |
| User | setMemberId(userId) | 회원의 로그인 아이디를 전달 |
| User | setGender(gender) | 회원 성별을 나타내는 M,F,U 중 한가지 값 전달 |
| User | setAge(age) | 회원 연령을 나타내는 코드값 전달 |
| User | setAttr1(attr) | 회원 속성#1 의미하는 코드값 전달 |
| User | setAttr2(attr) | 회원 속성#2 의미하는 코드값 전달 |
| User | setAttr3(attr) | 회원 속성#3 의미하는 코드값 전달 |
| User | setAttr4(attr) | 회원 속성#4 의미하는 코드값 전달 |
| User | setAttr5(attr) | 회원 속성#5 의미하는 코드값 전달 |

### 5.2 Page 분석
[분석 가능 Page Key](./page.md) **해당 목록에 들어있는 key 값에 한해서 분석이 가능**합니다.
분석을 희망하는 key 값을 확인후 적용해 주세요.

### 5.2.1 Page Identiy 분석 

 앱에 존재하는 각 페이지가 의미하는 Identity를 각 화면들에 적용하면, 앱에서 가장 사용 빈도가 높은 화면별 랭킹을 알 수 있습니다.

```c#
DOT.onStartPage();
Dictionary<string, object> page = new Dictionary<string, object>();
page.Add("pi", "Your Page Identity Value");
DOT.logScreen(page); 
```

### 5.2.2 상품 페이지 분석 

 e-commerce 앱의 경우 상품 상세 페이지에 분석코드를 적용하여, 상품별 조회수를 분석합니다.

```c#
DOT.onStartPage();
Dictionary<string, object> page = new Dictionary<string, object>();
Dictionary<string, object> product = new Dictionary<string, object>();
product.Add("orderNo", "ORD001");
product.Add("currency", "KRW");
product.Add("pg1", "sports");
product.Add("pg2", "fashion");
product.Add("pg3", "cloth");
product.Add("pnc", "PNC001");
product.Add("ordPno", "BESTABC");
product.Add("amt", "100,000");
product.Add("ea", "1");
product.Add("mvt1", "mvt1");
page.Add("product", product);
DOT.logScreen(page);
```

### 5.2.3 Contents Path 분석 

앱의 각 페이지에 Hierarchical 한 Contents Path값을 적용하면, 각 컨텐츠의 사용 비율을 카테고리별로 그룹화 하여 분석이 가능합니다.

```c#
DOT.onStartPage();
Dictionary<string, object> page = new Dictionary<string, object>();
// Contents Path는 '^' 문자로 시작, '^' 문자를 구분자로 합니다.
// Contents Path로 전달되는 값에는 ' 와 " 기호는 사용할 수 없습니다.
page.Add("cp", "^path^path");
DOT.logScreen(page); 
```

### 5.2.4 Multi Variables 분석 (사용자 정의 변수)

 Multi Variables 분석 항목은 사용자가 그 항목에 전달할 값을 정의하여 사용이 가능합니다. 
비즈니스에서 필요한 분석 항목을 SDK API로 전달하고, 그렇게 전달된 값을 기준으로 페이지뷰수, 방문수 등을 측정하고 보여줍니다. 

```c#
DOT.onStartPage();
Dictionary<string, object> page = new Dictionary<string, object>();
page.Add("mvt1", "page mvt 1");
page.Add("mvt2", "page mvt 2");
page.Add("mvt3", "page mvt 3");
page.Add("mvt4", "page mvt 4");
page.Add("mvt5", "page mvt 5");
DOT.logScreen(page); 
```

### 5.2.5 내부 검색어 분석 

 앱에 검색기능이 있는 경우, 사용자가 입력한 검색어와, 검색한 카테고리, 검색 결과수등을 분석하면, 검색 기능의 활용성을 측정할 수 있습니다. 
검색 결과가 보여지는 화면에 분석 코드를 적용합니다.

```c#
DOT.onStartPage();
// 사용자가 '통합 검색' 카테고리에서 '청바지' 검색어로 '1200개의 검색 결과를 보았을떄 적용 예시 
Dictionary<string, object> page = new Dictionary<string, object>();
page.Add("skwd", "청바지");
page.Add("scart", "통합검색");
page.Add("sresult", "1200");
DOT.logScreen(page); 
```

### 5.3 Click 분석
[분석 가능 Click Key](./click.md) **해당 목록에 들어있는 key 값에 한해서 분석이 가능**합니다.
분석을 희망하는 key 값을 확인후 적용해 주세요.

### 5.3.1 검색 결과 클릭 분석 

 검색 결과 페이지에서 보여지는 많은 검색 결과 항목별 클릭수를 분석합니다.
이 분석 결과를 통해서 검색 결과의 상단에 노출되는 항목들이 적절한지 가늠할 수 있습니다. 
검색 결과 페이지에서 특정 항목이 클릭되면, 해당 화면으로 이동하기 이전에 아래와 같이 분석 코드를 적용하세요.

```c#
Dictionary<string, object> click = new Dictionary<string, object>();
click.Add("ckTp", "SCH");
DOT.logClick(click);
```

### 5.3.2 장바구니 담긴 상품 분석 

e-commerce 관련된 비즈니스의 경우 장바구니에 담긴 상품을 분석할 수 있습니다.

```c#
Dictionary<string, object> click = new Dictionary<string, object>();
click.Add("ckTp", "SCRT");
Dictionary<string, object> product = new Dictionary<string, object>();
product.Add("pg1", "상품카테고리(대)");
product.Add("pnc", "상품코드");
product.Add("pnAtr1", "상품속성#1");
click.Add("product", product);
DOT.logClick(click);
```

### 5.3.3 클릭 이벤트 분석 

앱에 존재하는 다양한 클릭 요소 (배너, 버튼 등)에 대해서, 클릭수를 분석합니다. 
각 요소가 클릭되는 시점에 아래와 클릭된 요소의 목적지 화면으로 이동하기 이전에 아래와 같은 분석 코드를 적용하세요.

```c#
Dictionary<string, object> click = new Dictionary<string, object>();
click.Add("ckTp", "CKC");
DOT.logClick(click);
```

클릭된 요소의 ID값으로 단일 문자열로된 값을 전달하기도 하지만,
앞에서 설명한 **Contents Path 분석** 과 같이, Hierarchical 한 Path값을 전달하여 추후 데이터 조회시 Categorizing 하게 보기도 가능합니다
Hierarchical 한 Path 값을 사용하고자 할때 값에 대한 제약사항은 **Contents Path 분석** 과 동일합니다

### 5.3.4 클릭 이벤트 고급 분석 (Multi Variables) 

 클릭 이벤트 분석시 앞에서 설명한 Multi Variables 분석 을 같이 적용하면, Multi Variables 분석 항목별 클릭수 를 측정할 수 있습니다. 클릭 이벤트가 발생된 시점에 다음과 같이 Multi Variables 값을 같이 SDK에 전달하도록 분석코드를 적용하세요.

```c#
// 클릭 이벤트 분석시 Multi Variables 분석값을 같이 전송하는 예시
Dictionary<string, object> click = new Dictionary<string, object>();
click.Add("mvt1", "click mvt 1");
click.Add("mvt2", "click mvt 2");
click.Add("mvt3", "click mvt 3");
click.Add("mvt4", "click mvt 4");
click.Add("mvt5", "click mvt 5");
DOT.logClick(click); 
```

### 5.4 Conversion 분석
가장 대표적으로 구매 전환 을 생각할 수 있습니다. 하지만, 앱내에는 앱이 제공하는 서비스에 따라서 매우 다양한 Conversion이 존재할 수 있습니다. 
또한, 이미 정의된 Conversion 일지라도, 서비스의 변화, 시대의 변화애 따라서 새로 정의되어야 하기도 하고, 사용하지 않아서 폐기되기도 합니다.
SDK는 총 80개의 Conversion을 사용자가 정의하고, 분석 코드를 적용함으로써 앱으로 인하여 발생하는 Conversion 측정이 가능합니다. 
이는, **구매 전환과는 독립적으로 분석되며, 사용자는 언제든지 분석 코드의 적용 기준을 새로 정의할 수** 있습니다.

[분석 가능 Conversion Key](./goal.md) **해당 목록에 들어있는 key 값에 한해서 분석이 가능**합니다.
분석을 희망하는 key 값을 확인후 적용해 주세요.

### 5.4.1 Conversion 분석

```c#
// Micro Conversion #1 번의 사용 예시
Dictionary<string, object> conversion = new Dictionary<string, object>();
conversion.Add("g1", "goal 1");
DOT.logEvent(conversion);
```

### 5.4.2 Conversion 상품 분석 

 Conversion은 단순하게 발생 횟수를 측정할 수도 있으나, 상품과 연계하여 상품별로 정의한 Conversion의 발생 횟수 측정도 가능합니다. 이벤트가 발생한 시점에 아래와 같이 Conversion Data + Product Data를 SDK로 전달하세요.
 
```c#
Dictionary<string, object> conversion = new Dictionary<string, object>();
Dictionary<string, object> product = new Dictionary<string, object>();
product.Add("pg1", "상품카테고리(대)");
product.Add("pnc", "상품코드");
product.Add("pnAtr1", "상품속성#1");
conversion.Add("product", product);
DOT.logEvent(conversion);
```

### 5.4.3 Conversion Multi Variables 분석 

 Multi Variables 항목과 연계하여 Conversion의 발생 횟수 측정도 가능합니다. 이벤트가 발생한 시점에 아래와 같이 Conversion Data + Multi Variables Data를 SDK로 전달하세요.

```c#
Dictionary<string, object> conversion = new Dictionary<string, object>();
conversion.Add("mvt1", "conversion mvt 1");
conversion.Add("mvt2", "conversion mvt 2");
conversion.Add("mvt3", "conversion mvt 3");
conversion.Add("mvt4", "conversion mvt 4");
conversion.Add("mvt5", "conversion mvt 5");
DOT.logEvent(conversion);
```

### 5.5 Purchase 분석
앱내에서 발생하는 구매 이벤트를 분석합니다. 구매 완료 페이지에서 아래와 같이 구매와 관련된 정보를 SDK에 전달하세요.

[분석 가능 Purchase Key](./purchase.md) **해당 목록에 들어있는 key 값에 한해서 분석이 가능**합니다.
분석을 희망하는 key 값을 확인후 적용해 주세요.

#### 5.5.1 Purchase 제품 분석

```c#
Dictionary<string, object> purchase = new Dictionary<string, object>();
Dictionary<string, object> product = new Dictionary<string, object>();
product.Add("pg1", "상품카테고리(대)");
product.Add("pnc", "상품코드");
product.Add("pnAtr1", "상품속성#1");
product.Add("ea", "1");
List<Dictionary<string, object>> productList = new List<Dictionary<string, object>>();
productList.Add(product);
purchase.Add("products", productList);
DOT.logPurchase(purchase);
```

#### 5.5.2 Purchase Multi Variables 분석 

Multi Variables 항목과 연계하여 Purchase 분석도 가능합니다. 이벤트가 발생한 시점에 아래와 같이 Purchase Data + Multi Variables Data 를 SDK로 전달하세요.

```c#
Dictionary<string, object> purchase = new Dictionary<string, object>();
purchase.Add("mvt1", "purchase mvt 1");
purchase.Add("mvt2", "purchase mvt 2");
purchase.Add("mvt3", "purchase mvt 3");
purchase.Add("mvt4", "purchase mvt 4");
purchase.Add("mvt5", "purchase mvt 5");
DOT.logPurchase(purchase);
```
