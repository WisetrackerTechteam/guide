## 1. Install

### 1.1 SDK Download

Android 프로젝트 `app/build.gradle` 파일의 `dependencies` 블록에 의존성을 추가해 주세요.

```gradle
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    ....
    implementation 'com.sdk.wisetracker.base:base_module_test:0.0.84'       // BASE
    implementation 'com.sdk.wisetracker.new_dot:new_dot_module_test:0.0.84' // DOT
    implementation 'com.sdk.wisetracker.dox:dox_module_test:0.0.84'         // DOX
}
```

### 1.2 AuthorizationKey 등록
 
Android 프로젝트 `app/res/values/strings.xml` 파일에 제공받은 `App Analytics Key` 정보를 추가해 주세요.

```xml
<string-array name="dotAuthorizationKey">
    <item name="usdMode">1</item>                                           // (1) DOT/DOX (2) DOT
    <item name="domain">http://collector.naver.wisetracker.co.kr</item>     // DOT END POINT
    <item name="domain_x">http://collector.naver.wisetracker.co.kr</item>   // DOX END POINT
    <item name="serviceNumber">103</item>
    <item name="expireDate">14</item>
    <item name="isDebug">false</item>
    <item name="isInstallRetention">true</item>
    <item name="isFingerPrint">true</item>
    <item name="accessToken">access_token_string</item>
</string-array>
```

### 1.3 Http 통신 허용 설정

프로젝트의 `Target API 28 이상`일 경우 Http 통신 허용을 추가해 주세요.

```xml

<!-- AndroidManifest.xml -->
<application
	android:icon="@mipmap/ic_launcher"
	android:label="@string/app_name"
	android:networkSecurityConfig="@xml/network_security_config"
	android:theme="@style/AppTheme">
```

```xml

<!-- app/res/xml/network_security_config.xml -->
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">collector.naver.wisetracker.co.kr</domain>
        <domain includeSubdomains="true">report.wisetracker.co.kr</domain>
    </domain-config>
</network-security-config>
```

## 2. 기본 설정

### 2.1 페이지 분석

기본 페이지 분석을 위해 각 화면의 `진입점`에 다음과 같은 코드를 적용해 주세요.

```java
@Override
protected void onResume() {
    super.onResume();
    DOT.onStartPage(context);
}
```

## 3. 유입 경로 분석

### 3.1 딥링크 분석

`딥링크`를 통해 앱이 실행되는 `경로 분석`이 필요한 경우 적용해 주세요.

#### 3.1.1 딥링크 등록

`AndroidManifest.xml` 파일에서 앱의 환경에 맞춰 딥링크로 오픈되는 `Activity`의 `android:host`, `android:scheme` 값을 변경해 주세요.

```xml
<!-- 예시는 wisetracker://wisetracker.co.kr 링크로 앱 진입 경우 -->
<activity android:name="com.sample.DeepLinkActivity" 
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

#### 3.1.2 딥링크 수신

딥링크가 실행되는 `Activity`에서 아래와 같은 코드를 적용해 주세요.


```java

public class DeepLinkActivity extends Activity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        /* 중략.. */
        DOT.setDeepLink(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        DOT.setDeepLink(getIntent());
    }

}
```

### 3.2 푸시 분석

#### 3.2.1 푸시 토큰 설정

##### (1) `Activity`에서 푸시 토큰 설정

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    FirebaseInstanceId
        .getInstance()
        .getInstanceId()
        .addOnSuccessListener(context, new OnSuccessListener() {
            @Override
            public void onSuccess(InstanceIdResult instanceIdResult) {
                String newToken = instanceIdResult.getToken();
                // Wisetracker API 호출
                DOT.setPushToken(newToken);
            }
        });
}
```

##### (2) `FirebaseMessagingService`를 상속받는 `Service`에서 푸시 토큰 설정

```java
public class FcmService extends FirebaseMessagingService {

    @Override
    public void onNewToken(String token) {
        super.onNewToken(token);
        // Wisetracker API 호출
        DOT.setPushToken(token); 
    }

}
```

#### 3.2.2 푸시 수신 설정

푸시 수신시 호출되는 `onMessageReceived` 메소드에 아래 내용을 추가해 주세요.

```java
public class FcmService extends FirebaseMessagingService {

@Override
public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        // Wisetracker API 호출
        DOT.setPushReceiver(remoteMessage.toIntent()); 
    }

}
```

#### 3.2.3 푸시 클릭 설정

푸시 클릭시 진입하는 `Activity`에서 전달 받은 인텐트 정보를 SDK에 전달해 주세요.

```java
public class PushClickActivity extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Wisetracker API 호출
        DOT.setPushClick(getIntent()); 
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        // Wisetracker API 호출
        DOT.setPushClick(getIntent()); 
    }


}
```

### 3.3 인스톨 레퍼러 자체 분석 설정

분석 대상 앱의 특별한 이유에 의해서 SDK가 자동으로 수신한 유입 경로를 사용하지 않을 경우에 적용해 주세요.  
`일반적으로 SDK 내부에서 자동으로 처리하기 때문에 별도의 분석코드 적용이 필요하지 않습니다.`

```xml
<!-- AndroidManifest.xml -->
<meta-data
    android:name="disableDotReceiver"
    android:value="true" />
```

```java
installReferrerClient.startConnection(new InstallReferrerStateListener() {

       @Override
       public void onInstallReferrerSetupFinished(int responseCode) {
           try {
               switch (responseCode) {
                   case InstallReferrerClient.InstallReferrerResponse.OK:
                       // Wisetracker API 호출
                       DOT.setInstallReferrer(installReferrerClient.getInstallReferrer());
                       break;
               }
           } catch (RemoteException re) {
               Log.d(TAG, "remote exception" + re);
           } catch (Exception e) {
               Log.d(TAG, "exception" + e);
           }
       }

       @Override
       public void onInstallReferrerServiceDisconnected() {}

});
```

## 4. 고급 컨텐츠 분석

`in-App`에서 발생하는 다양한 이벤트를 분석하기 위해서는 분석 대상 앱에서 해당 이벤트가 발생되는 시점에 SDK로 해당 정보를 전달해야 합니다.  
이어지는 내용에서는 주요 이벤트들의 분석 방법에 대해서 자세하게 설명합니다.

### 4.1 회원 분석

`사용자 정보 분석`을 합니다.

```java
DOT.setUser(
    new User.Builder()
    .setGender("M")
    .setAge("A")
    .setAttr1("attr1")
    .build()
);
```

**User.Class**

| Class 이름  |      Method 이름       |                   파라미터                   |
| --------   | -------------------   | ------------------------------------------ |
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

### 4.2 Page 분석

[분석 가능 Page Key](../SDK/key/page). `해당 목록에 들어있는 key 값`에 한해 `분석이 가능`합니다. 분석을 희망하는 key 값을 확인후 적용해 주세요.


#### 4.2.1 Page Identiy 분석 

앱에 존재하는 각 페이지가 의미하는 `Identity`를 각 화면들에 적용하면 앱에서 가장 사용 빈도가 높은 화면별 랭킹을 알 수 있습니다.

```java
@Override
protected void onResume() {
    super.onResume();
    DOT.onStartPage(this);
    Map<String, Object> page = new HashMap<>();
    page.put("pi", "Your Page Identity Value");
    DOT.logScreen(page);
}
```

#### 4.2.2 상품 페이지 분석 

`e-commerce` 앱의 경우 상품 상세 페이지에 분석코드를 적용하여 상품별 조회수를 분석합니다.

```java
@Override
protected void onResume() {
    super.onResume();
    DOT.onStartPage(this);
    Map<String, Object> page = new HashMap<>();
    page.put("pi", "PRODUCT_PAGE");
    Map<String, Object> product = new HashMap<>();
    product.put("orderNo", "ORD001");
    product.put("currency", "KRW");
    product.put("pg1", "sports");
    product.put("pg2", "fashion");
    product.put("pg3", "cloth");
    product.put("pnc", "PNC001");
    product.put("ordPno", "BESTABC");
    product.put("amt", "100,000");
    product.put("ea", "1");
    product.put("mvt1", "mvt1");
    List<Map<String, Object>> productList = new ArrayList<>();
    productList.add(product);
    page.put("products", productList);
    DOT.logScreen(page);
}
```

#### 4.2.3 Contents Path 분석 

앱의 각 페이지에 `Hierarchical` 한 `Contents Path`를 적용하면 각 컨텐츠의 사용 비율을 카테고리별로 그룹화 하여 분석이 가능합니다.

```java
@Override
protected void onResume() {
    super.onResume();
    DOT.onStartPage(this);
    Map<String, Object> page = new HashMap<>();
    // Contents Path는 '^' 문자로 시작, '^' 문자를 구분자로 합니다.
    // Contents Path로 전달되는 값에는 ' 와 " 기호는 사용할 수 없습니다.
    page.put("cp", "^path^path");
    DOT.logScreen(page);
}
```

#### 4.2.4 사용자 정의 분석 

`사용자 정의 분석` 항목은 사용자가 그 항목에 전달할 값을 직접 정의하여 사용이 가능합니다.

```java
@Override
protected void onResume() {
    super.onResume();
    DOT.onStartPage(this);
    Map<String, Object> page = new HashMap<>();
    page.put("mvt1", "page mvt 1");
    page.put("mvt2", "page mvt 2");
    page.put("mvt3", "page mvt 3");
    page.put("mvt4", "page mvt 4");
    page.put("mvt5", "page mvt 5");
    DOT.logScreen(page);
}
```

#### 4.2.5 내부 검색어 분석

앱에 검색기능이 있는 경우 사용자가 입력한 `검색어`와, 검색한 `카테고리`, `검색 결과수` 등을 분석하면 검색 기능의 활용성을 측정할 수 있습니다.  
검색 결과가 보여지는 화면에 분석 코드를 적용합니다.

```java
@Override
protected void onResume() {
    super.onResume();
    DOT.onStartPage(this);
    // 사용자가 '통합 검색' 카테고리에서 '청바지' 검색어로 '1200개의 검색 결과를 보았을떄 적용 예시
    Map<String, Object> page = new HashMap<>();
    page.put("skwd", "청바지");
    page.put("scart", "통합검색");
    page.put("sresult", "1200");
    DOT.logScreen(page);
}
```

### 4.3 클릭 분석

[분석 가능 Click Key](../SDK/key/click) `해당 목록에 들어있는 key 값`에 한해 `분석이 가능`합니다. 분석을 희망하는 key 값을 확인후 적용해 주세요.

#### 4.3.1 검색 결과 클릭 분석 

검색 결과 페이지에서 보여지는 많은 검색 결과 항목별 `클릭수`를 분석합니다.  
이 분석 결과를 통해서 검색 결과의 상단에 노출되는 항목들이 적절한지 가늠할 수 있습니다.  
검색 결과 페이지에서 특정 항목이 클릭되면, 해당 화면으로 이동하기 이전에 아래와 같이 분석 코드를 적용하세요.  

```java
Map<String, Object> click = new HashMap<>();
click.put("ckTp", "SCH");
DOT.logClick(click);
```

#### 4.3.2 장바구니 담긴 상품 분석

`e-commerce` 관련된 비즈니스의 경우 장바구니에 담긴 상품을 분석할 수 있습니다.

```java
Map<String, Object> click = new HashMap<>();
click.put("ckTp", "SCRT");
Map<String, Object> product = new HashMap<>();
product.put("pg1", "상품카테고리(대)");
product.put("pnc", "상품코드");
product.put("pnAtr1", "상품속성#1");
click.put("product", product);
DOT.logClick(click);
```

#### 4.3.3 클릭 이벤트 분석 

앱에 존재하는 다양한 클릭 요소(`배너`, `버튼` 등)에 대해서 `클릭수`를 분석합니다. 각 요소가 클릭되는 시점에 아래와 같은 분석 코드를 적용해 주세요.

```java
Map<String, Object> click = new HashMap<>();
click.put("ckTp", "CKC");
DOT.logClick(click);
```

**클릭된 요소의 ID값으로 단일 문자열로된 값을 전달하기도 하지만, 앞에서 설명한 Contents Path 분석과 같이 Hierarchical 한 Path값을 전달하여 추후 데이터 조회시 Categorizing 하게 보기도 가능합니다. Hierarchical 한 Path 값을 사용하고자 할때 값에 대한 제약사항은 Contents Path 분석과 동일합니다.**

#### 4.3.4 사용자 정의 분석

`사용자 정의 분석` 항목은 사용자가 그 항목에 전달할 값을 직접 정의하여 사용이 가능합니다.

```java
Map<String, Object> click = new HashMap<>();
click.put("mvt1", "click mvt 1");
click.put("mvt2", "click mvt 2");
click.put("mvt3", "click mvt 3");
click.put("mvt4", "click mvt 4");
click.put("mvt5", "click mvt 5");
DOT.logClick(click);
```

### 4.4 Conversion 분석

가장 대표적으로 구매 전환을 생각할 수 있지만, 앱내에는 앱이 제공하는 서비스에 따라서 매우 다양한 Conversion이 존재할 수 있습니다.  
또한, 이미 정의된 Conversion 일지라도, 서비스의 변화, 시대의 변화애 따라서 새로 정의되어야 하기도 하며, 사용하지 않아서 폐기되기도 합니다.  
SDK는 총 `80개`의 `Conversion`을 사용자가 정의하고, 분석 코드를 적용함으로써 앱으로 인하여 발생하는 Conversion 측정이 가능합니다.  
이는, **구매 전환과는 독립적으로 분석되며, 사용자는 언제든지 분석 코드의 적용 기준을 새로 정의** 할 수 있습니다.  

[분석 가능 Conversion Key](../SDK/key/goal) `해당 목록에 들어있는 key 값`에 한해 `분석이 가능`합니다. 분석을 희망하는 key 값을 확인후 적용해 주세요.

```java
// Conversion 1번의 사용 예시
Map<String, Object> conversion = new HashMap<>();
conversion.put("g1", "goal 1");
DOT.logEvent(conversion);
```

#### 4.4.1 Conversion 상품 분석 

단순하게 Conversion 발생 횟수를 측정할 수도 있으나, 상품과 연계하여 `상품별`로 정의한 Conversion 발생 횟수 측정이 가능합니다. 

```java
Map<String, Object> conversion = new HashMap<>();
Map<String, Object> product = new HashMap<>();
product.put("pg1", "상품카테고리(대)");
product.put("pnc", "상품코드");
product.put("pnAtr1", "상품속성#1");
conversion.put("product", product);
DOT.logEvent(conversion);
```

#### 4.4.2 Conversion 사용자 정의 분석

`사용자 정의 분석` 항목은 사용자가 그 항목에 전달할 값을 직접 정의하여 사용이 가능합니다.

```java
Map<String, Object> conversion = new HashMap<>();
conversion.put("mvt1", "conversion mvt 1");
conversion.put("mvt2", "conversion mvt 2");
conversion.put("mvt3", "conversion mvt 3");
conversion.put("mvt4", "conversion mvt 4");
conversion.put("mvt5", "conversion mvt 5");
DOT.logEvent(conversion);
```

### 4.5 Purchase 분석

[분석 가능 Purchase Key](../SDK/key/purchase) `해당 목록에 들어있는 key 값`에 한해 `분석이 가능`합니다. 분석을 희망하는 key 값을 확인후 적용해 주세요.
앱내에서 발생하는 `구매 이벤트`를 분석합니다. 구매 완료 페이지에서 아래와 같이 구매와 관련된 정보를 SDK에 전달해 주세요.

#### 4.5.1 Purchase 제품 분석

```java
Map<String, Object> purchase = new HashMap<>();
Map<String, Object> product = new HashMap<>();
product.put("pg1", "상품카테고리(대)");
product.put("pnc", "상품코드");
product.put("pnAtr1", "상품속성#1");
product.put("ea", "1");
List<Map<String, Object>> productList = new ArrayList<>();
productList.add(product);
purchase.put("products", productList);
DOT.logPurchase(purchase);
```

#### 4.5.2 Purchase 사용자 정의 분석

`사용자 정의 분석` 항목은 사용자가 그 항목에 전달할 값을 직접 정의하여 사용이 가능합니다.

```java
Map<String, Object> purchase = new HashMap<>();
purchase.put("mvt1", "purchase mvt 1");
purchase.put("mvt2", "purchase mvt 2");
purchase.put("mvt3", "purchase mvt 3");
purchase.put("mvt4", "purchase mvt 4");
purchase.put("mvt5", "purchase mvt 5");
DOT.logPurchase(purchase);
```

## 5. 확장 분석 (DOX)

### 5.1 기본 설정

#### 5.1.1 사용자 정의 키 설정

`#` 구분자 기준으로 왼쪽은 `기본키` 오른쪽은 `커스텀키`를 적용해주세요.  
`미설정시 기본키로 자동 적용됩니다.`

```xml
<!-- 예시는 advtId 기본키 값을 advt_id 커스텀키 값으로 변경하는 설정 -->
<string-array name="customKeyList">
  <item name="custom_key_value1">advtId#advt_id</item>
</string-array>
```

### 5.2 고급 컨텐츠 분석

#### 5.2.1 GroupIdentify 분석

`GroupIdentify`는 `Group 기준`의 데이터 타입이 필요한 경우 사용되며, 다음과 같은 사용상의 관계를 가지고 있습니다.

**XIdentify.class**

| Class 이름 | Method 이름         | 파라미터 |
| --------   | -------------------   | ------------------------------------------ |
|            | key                 | group 을 식별하기 위해 사용되는 식별 코드를 전달 |
|            | value               | 전달된 group 식별 코드에 대한 값을 전달 |
| XIdentify  | set(key, value)     | key 값으로 전송된 value 데이터에 대하여 서버측 처리 방법을 INSERT |
| XIdentify  | setOnce(key, value) | key 값으로 전송된 value 데이터에 대하여 서버측 처리 방법을 ONLY INSERT 로 지정. 이 의미는 값이 존재하지 않을 경우에만 값을 설정하고 값이 이미 설정된 경우에는 전달된 value 값은 무시 |
| XIdentify  | unset(value)        | 전송된 key값으로 서버측에 존재하는 데이터를 DELETE 하도록 지정 |
| XIdentify  | add(key, increment) | key값으로 전송된 increment 데이터를 서버측에 존재하는 key값의 origin 데이터에 ADD 처리 하도록 지정. 필요한 경우 음수를 전송하여 MINUS 처리 효과를 기대 |
| XIdentify  | append(key, value)  | key값으로 전송된 value 데이터를 서버측에 존재하는 key값의 orgin 데이터와 함께 JOIN(APPEND) 처리 하도록 지정. 만약 서버측 데이터가 현재 Array 타입이 아닌 경우에는, origin 데이터를 Array 타입을 변경 후, 전달되어진 value 데이터를 APPEND 처리 |
| XIdentify  | prepend(key, value) | key값으로 전송된 value 데이터를 서버측에 존재하는 key값의 origin 데이터에 JOIN(INSERT) 처리 하도록 지정. 만약 서버측 데이터가 현재 Array 타입이 아닌 경우에는, origin 데이터를 Array 타입을 변경 후, 전달되어진 value 데이터를 INSERT 처리 |

```java
// XIdentify에는 1개 이상의 항목이 설정 되어야 합니다.
DOX.groupIdentify("company", "gsshop",
    new XIdentify.Builder()
        .setOnce("ID", "MRCM")
        .set("action", "loginSuccess")
        .add("visitCount", 1)
        .build());
```

#### 5.2.2 UserIdentify 분석

`UserIdentify`는 `User 기준`의 데이터 타입이 필요한 경우 사용되며, 다음과 같은 사용상의 관계를 가지고 있습니다.

**XIdentify.class**

| Class 이름 | Method 이름         | 파라미터 |
| --------   | -------------------   | ------------------------------------------ |
|            | key                 | group 을 식별하기 위해 사용되는 식별 코드를 전달 |
|            | value               | 전달된 group 식별 코드에 대한 값을 전달 |
| XIdentify  | set(key, value)     | key 값으로 전송된 value 데이터에 대하여 서버측 처리 방법을 INSERT |
| XIdentify  | setOnce(key, value) | key 값으로 전송된 value 데이터에 대하여 서버측 처리 방법을 ONLY INSERT 로 지정. 이 의미는 값이 존재하지 않을 경우에만 값을 설정하고 값이 이미 설정된 경우에는 전달된 value 값은 무시 |
| XIdentify  | unset(value)        | 전송된 key값으로 서버측에 존재하는 데이터를 DELETE 하도록 지정 |
| XIdentify  | add(key, increment) | key값으로 전송된 increment 데이터를 서버측에 존재하는 key값의 origin 데이터에 ADD 처리 하도록 지정. 필요한 경우 음수를 전송하여 MINUS 처리 효과를 기대 |
| XIdentify  | append(key, value)  | key값으로 전송된 value 데이터를 서버측에 존재하는 key값의 orgin 데이터와 함께 JOIN(APPEND) 처리 하도록 지정. 만약 서버측 데이터가 현재 Array 타입이 아닌 경우에는, origin 데이터를 Array 타입을 변경 후, 전달되어진 value 데이터를 APPEND 처리 |
| XIdentify  | prepend(key, value) | key값으로 전송된 value 데이터를 서버측에 존재하는 key값의 origin 데이터에 JOIN(INSERT) 처리 하도록 지정. 만약 서버측 데이터가 현재 Array 타입이 아닌 경우에는, origin 데이터를 Array 타입을 변경 후, 전달되어진 value 데이터를 INSERT 처리 |

```java

// XIdentify에는 1개 이상의 항목이 설정 되어야 합니다.
DOX.userIdentify(
    new XIdentify.Builder()
        .setOnce("ID", "MRCM")
        .set("action", "loginSuccess")
        .add("visitCount", 1)
        .build());
```

#### 5.2.3 Event 분석

`Event`는 앱 내에서 발생하는 다양한 이벤트 데이터를 전송하고자 하는 경우에 사용되며, 다음과 같은 사용상의 관계를 가지고 있습니다.

**XEvent.class**

| Class 이름  | Method 이름          | 파라미터                         |
| ----------- | -------------------- | -------------------------------- |
| XEvent      | setEventName(value)  | event name 값을 전달             |
| XEvent      | setProperties(value) | xProperties 값을 전달            |
| XProperties | set(key, value)      | xProperties key, value 값을 전달 |

```java

// logXEvent()는 XEvent Object를 파라미터로 전달 받고 있으며, XEvent Object 의 setEventName()은 Required 속성을 가집니다.
// 필요한 경우 XEvent Object의 setProperties()를 사용하면, event와 관련된 사용자 정의 데이터를 추가할 수 있습니다.

// Example 1
DOX.logXEvent(
    new XEvent.Builder()
        .setEventName("mypage")
        .build());
// Example 2
DOX.logXEvent(
    new XEvent.Builder()
        .setEventName("my page with some data")
        .setProperties(
            new XProperties.Builder()
                .set("pageId", "MAIN")
                .build())
        .build()));
```

#### 5.2.4 Conversion 분석

`Conversion`은 앱 내에서 발생하는 이벤트중 분석적 의미가 있는 `MicroConversion 이벤트`를 전송하고자 하는 경우에 사용되며, 다음과 같은 사용상의 관계를 가지고 있습니다.

**XConversion.class**

| Class 이름  | Method 이름          | 파라미터                         |
| ----------- | -------------------- | -------------------------------- |
| XConversion | setEventName(value)  | event name 값을 전달             |
| XConversion | setProperties(value) | xProperties 값을 전달            |
| XProperties | set(key, value)      | xProperties key, value 값을 전달 |

```java

// logXConversion()은 XConversion Object를 파라미터로 전달 받고 있으며, XConversion Object의 setConversionName()은 Required 속성을 가집니다.
// 필요한 경우 XConversion Object의 setProperties()를 사용하면, conversion에 관련된 사용자 정의 데이터를 추가할 수 있습니다.

// Example 1
DOX.logXConversion(
    new XConversion.Builder()
        .setEventName("start tutorial")
        .build());

// Example 2
DOX.logXConversion(
    new XConversion.Builder()
        .setEventName("Conversion")
        .setProperties(
            new XProperties.Builder()
                .set("pageId", "totualStart")
                .set("Object", new XProperties.Builder().set("test", "value").build())
                .set("Array", new int[]{1, 2, 3, 4})
        .build())
.build());
```

#### 5.2.5 Purchase 분석

`Purchase`는 앱 내에서 발생하는 구매 이벤트를 전송하고자 하는 경우에 사용되며, 다음과 같은 사용상의 관계를 가지고 있습니다.

**XPurchase.class**

| Class 이름   | Method 이름                                                | 파라미터 |
| ----------- | --------------------------------------------------------- | ----------------------------------------------------- |
| XPurchase   | **setOrderNo(value)** **Required**                        | 구매와 관련된 주문 번호를 설정 |
| XPurchase   | **setRevenueType(value)** **Required**                      | 발생된 이벤트가 구매 또는 환불인지를 구분할 수 있는 값을 설정 |
| XPurchase   | **setCurrency(value)** **Required**                       | 결제 진행에 사용된 통화 코드를 설정 |
| XPurchase   | **setProduct(product)** **Required**                      | 구매된 상품 정보를 설정 |
| XPurchase   | **setProductList(List\*<Product\*> value)** **Required**      | 구매된 상품 정보를 설정 |
| XProduct    | **setFirstCategory(value)** **Required**                  | 상품에 대한 대분류 상품 카테코리 정보를 설정 |
| XProduct    | setSecondCategory(value)                                  | 상품에 대한 중분류 상품 카테코리 정보를 설정 |
| XProduct    | setThirdCategory(value)                                   | 상품에 대한 소분류 상품 카테코리 정보를 설정 |
| XProduct    | setDetailCategory(value)                                  | 상품에 대한 상세 카테코리 정보를 설정 |
| XProduct    | **setProductCode(value)** **Required**                    | 상품을 식별할 수 있는 상품코드를 설정 |
| XProduct    | **setOrderAmount(value)** **Required**                    | 상품 구매 금액 합계를 설정 (단가, 수량) |
| XProduct    | **seOrderQuantity(value)** **Required**                   | 상품 구매 수량을 설정 |
| XProduct    | setProductOrderNo(value)                                  | 상품 주문 번호 값을 전달 |
| XProduct    | setProperties(value)                                      | 구매된 각각의 상품과 관련된 사용자 정의 데이터를 추가 |
| XPurchase   | setProperties(value)                                      | 구매와 관련된 사용자 정의 데이터를 추가 |
| XProperties | set(key, value)                                           | xProperties key, value 값을 전달 |

```java
// Example 1 
DOX.logXPurchase(
    new XPurchase.Builder()
        .setCurrency("KRW")
        .setRevenueType("Purchase")
        .setOrderNo("new_order_number_1")
        .setProduct(
            new XProduct.Builder()
                .setFirstCategory("CAT1")
                .setSecondCategory("CAT2")
                .setThirdCategory("CAT3")
                .setDetailCategory("CAT4")
                .setProductCode("product_code1")
                .setOrderQuantity(1)
                .setOrderAmount(10000)
                .setProperties(
                    new XProperties.Builder()
                        .set("isSale", "50%")
                        .build())
                .build())
        .build());
```


## 6. 웹앱 분석

### 6.1 웹앱 설정

웹앱 분석을 위해 다음과 같은 코드를 적용해 주세요.

```java
// WebView를 사용하는 화면에 적용해 주세요.
@Override
protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    WebView webView = findViewById(R.id.web_view);
    /* 중략 */
    // DOT 이용시
    DOT.setWebView(webView);
    // DOX 이용시
    DOX.setWebView(webView);
}
```

