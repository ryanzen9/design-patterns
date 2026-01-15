// 外观模式

// 为什么要用外观模式？

// 场景
// 简化复杂接口： 当一个子系统极其复杂，或者 API 很多时。
// 解耦客户端与代码库： 避免客户端代码与子系统的具体实现细节深度绑定。
// 构建多层结构： 在分布式系统或大型项目中，为每一层定义一个统一的入口。

// 优点
// 降低耦合度： 客户端不需要知道子系统内部的复杂逻辑，减少了相互依赖。
// 易于使用： 对外只暴露简单的接口，降低了学习和使用门槛。
// 更好的分层： 可以定义每一层系统的入口，通过外观进行层间调用。

// 缺点
// 违背开闭原则： 如果子系统需要增加新功能，可能需要修改外观类。
// 可能变成“万能类”： 如果设计不好，外观类可能会变得非常庞大且难以维护。

// 通过声明统一的操作类，隐藏子类的内部实现

class Light {  off() { console.log("关灯"); } }
class Projector {  on() { console.log("打开投影仪"); } }
class SoundSystem {  setVolume(v: number) { console.log("音量设为 " + v); } }

// 传统模式，在方法内需要逐一操作子系统
function moiveStartTraditional() {
    const light = new Light();
    const projector = new Projector();
    const soundSystem = new SoundSystem();

    light.off();
    projector.on();
    soundSystem.setVolume(50);
}
void moiveStartTraditional();

// 外观模式
class HomeTheaterFacade {
    private light: Light;
    private projector: Projector;
    private soundSystem: SoundSystem;

    constructor() {
        this.light = new Light();
        this.projector = new Projector();
        this.soundSystem = new SoundSystem();
    }

    public watchMovie() {
        this.light.off();
        this.projector.on();
        this.soundSystem.setVolume(50);
    }
}
function moiveStartFacade() {
    const homeTheater = new HomeTheaterFacade();
    homeTheater.watchMovie();
}
void moiveStartFacade();
