Danh mục viết tắt: animation= anim
# animation_RN
React Native cung cấp 2 hệ thống API animation: 
  1. Animated : kiểm soát animation chi tiết và tương tác của các giá trị cụ thể của các Component.
  2. Layout Animation: điều khiển animation qua sự thay đổi toàn cục của layout. Ex:như các thay đổi thêm component, sửa component, xóa component trong layout.

[1] Animated API

[1.1]Tính chất:
  - Focuses on declarative relationship between I/O: sự chuyển dịch từ đầu vào đến đầu ra. Ex: opacity: 0 ==> 1
  - Configurable: cấu hình được. Ex : duration(thời gian diễn ra anim), delay(độ trễ của anim),...
  - Use 2 method start() and stop() to control time-base.
[1.2] Các loại:
  - Animated cung cấp 6 loại anim: View,Text, Image , Scrollview, Flatlist, SectionList.
  - Ngoài ra có thể dùng Animated.createAnimatedComponent() để tạo ra Anim Component mong muốn.
[1.3] Configuring animations: cấu hình animations:
Có 3 loại configure anim phổ biến:

***[1.3.1]Animated.timing():

1. Định nghĩa: Map time range to easing value.
2. Cú pháp: 
    Animated.timing(
      animatedValue,{
        toValue: number,//giá trị đầu ra 
        duration: number,//thời gian của anim    
        easing:easingFunction,//hàm easing biểu diễn quá trình của anim
        delay: number//độ trễ của anim
        }
   )
@easingFuction: convey physically believable motion. 

1 số hàm predefine: 
  - back: lùi lại trước khi thực hiện,
  - bounce: nảy,
  - ease: quán tính,
  - elastic: đàn hồi,
tham khảo thêm: https://facebook.github.io/react-native/docs/easing
                https://easings.net/

***[1.3.2]Animated.spring():

1.Định nghĩa:Tracks velocity state to create fluid motions as the toValue updates and can be chained together.
2.Cú pháp:
  Animated.spring(
    animatedValue,
    {                       // chú ý friction,tesion đi 1 cặp, speed,bouciness đi 1 cặp
      toValue: number,      // 4 tham số đáng chú ý nhất.
      friction: number,     // điều khiển độ ma sát của anim
      tension: number,      // điều khiển tốc độ thực hiện của anim
      speed: number,        // điều khiển tốc độ của anim
      bouciness: number     // điều khiển độ đàn hồi của anim
    }
  )
***[1.3.3]Animated.decay(): 

1.Định nghĩa: Animates a value from an initial velocity to zero based on a decay coefficient. // từ 1 giá trị vận tốc khởi tạo giảm tới 0 dựa theo hệ số gia giảm.
2.Cú pháp:
  Animated.decay(
    animatedValue,
    {
      velocity: number,   //vận tốc khởi tạo
      deceleration: number, // hệ số giảm tốc
     }
   )
   
[1.4] Composing animations
có 4 cách thường gặp:

-Animated.delay(time): bắt đầu anim sau 1 khoảng thời gian
-Animated.sequence([anims]): bắt đầu các anim theo thứ tự, đợi anim trước xong mới tiếp tục
-Animated.parallel([anims]): bắt đầu các anim cùng 1 lúc
-Animated.stagger(time,[anims]): bắt đầu các anim theo thứ tự nhưng có khoảng thời gian delay giữa các anim


[1.5] Combining animated values
** khởi tạo 1 giá trị Animated: 
  -new Animated.Value(number) biểu thị cho 1 điểm
  -new Animated.Value(number) biểu thị cho 1 vector
** dựa trên các gíá trị đã khởi tạo có thể tạo ra các giá trị mới dựa vào:
-Animated.add()
-Animated.subtract()
-Animated.divide()
-Animated.modulo()
-Animated.multiply()

[1.6] Interplote()
Allow map input range to output range of AnimtedValue:
 
Cú pháp : AnimatedValue.interpolate({
  inputRange: [,,],     // khoảng giá trị animtedValue đầu vào. Ex: [0,1] 
  outputRange: [,,]     // khoảng giá trị đầu ra của anmitedValue mới. Ex: [100,0]
},
  extrapolate: 'clamp'  /optional/ không quan tâm đến các giá trị ngoài khoảng i/o range 
)

Sử dụng để tạo ra nhiều animation với các đầu ra khác nhau từ cùng 1 animtedValue:
Ex: muốn 1 animation độ mờ : 0->1
    và dịch chuyển trục Y : 100->0
Demo: 
  this.state={
    fadeAnim : new Animated.Value(0),
  }
  onAnimted(){
    Animated.timing(this.state.fadeAnim,{
      toValue:1,
      duration: 2000,
    }).start();
  }
  // style truyền vào animated component
  style={{
    opacity: this.state.fadeAnim, // Binds directly 
    transform: [{
      translateY: this.state.fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0]  // 0 : 100, 0.5 : 50, 1 : 0
      }),
    }],
  }}
  
  [1.7] Track gesture:
  Theo dõi các hoạt động như cuốn, kéo thả tạo animation:
  2 cách phổ biến:
  
  ***[1.7.1] đối với cuốn scroll view:
   Thêm vào thuộc tính onScroll của ScrollView : 
   Ex: Đối với cuốn ngang, sử dụng Animted.event để lấy ra giá trị vị trí x hiện tại khi cuốn và lưu vào AnimtedValue scrollX:
   onScroll={Animated.event(
     // scrollX = e.nativeEvent.contentOffset.x
     [{ nativeEvent: {
          contentOffset: {
            x: scrollX
          }
        }
      }]
   )}
  
  ***[1.7.2] đối với kéo,thả,vuốt : sử dụng PanResponder để bắt và theo dõi vị trí kèo thả, tốc độ,....
  tham khảo : https://facebook.github.io/react-native/docs/panresponder
  
  [1.8]Responding to the current animation value
  Dùng để theo dõi các giá trị AnimtedValue đi đang thực hiện Animtion. Có 2 cách:
    -spring.stopAnimation(callback) dừng animtion và gọi callback để lấy giá trị cuối cùng khi kết thúc animtion. 
    -spring.addListener(callback) gọi 1 callback không đồng bộ khi animation đang chạy, lấy giá trị hiện tại của animation.
  
  [1.9] create Animated Component : \
  Sử dụng  Animated.createAnimatedComponent() để tạo ra animated component có thể tương tác với Animated Api như các Animated component có sẵn.
  Ex : AnimateFlatlist= Animated.createAnimatedComponent(Flatlist)
 For more specific info : read https://facebook.github.io/react-native/docs/animations :)) 
 
 [2] Layout Animation
 Tự động tạo Animation cho view layout khi có sự thay đổi toàn cục layout.
 Một cách thông dụng thường : 
    B1:import {LayoutAnimation} from 'react-native
    B2:Gọi hàm LayoutAnimation.configureNext(config, onAnimationDidEnd) trước hàm this.setState
    *** cho Android cần thêm flag:
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
 
 Cú pháp:
 -configureNext(config, onAnimationDidEnd?) : cấu hình màn hình mới sẽ xảy ra animtion như thế nào
   +config: \\bắt buộc
      duration: mlseconds \\thời gian anim
      create: config \\cấu hình khi có view mới được thêm
      update: config\\cấu hình khi có view mới được sửa
      delete: config\\cấu hình khi có view mới được xóa
      
      cấu hình create, update, delete: create(duration, type, creationProp):
      for more detail on this para : https://facebook.github.io/react-native/docs/layoutanimation
   +onAnimationDidEnd?: gọi khi animation kết thúc\\không bắt buộc
  
  Example:
  LayoutAnimation.configureNext({
      duration: 200,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.2,
        duration:1000,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.2,
        duration:1000,
      },
      delete: {
      duration: 1000,
      type: LayoutAnimation.Types.spring,
      springDamping: 0.2,
      property: LayoutAnimation.Properties.opacity,
    },
   });
   
   Ngoài ra có thể sử dụng 1 số config preset  như sau easeInEaseOut,linear,spring:
   Example: LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
