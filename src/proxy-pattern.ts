// 代理模式

// 对比外观模式更倾向 接口简化 。 代理模式倾向于 代理以控制对这个对象的访问

// 为什么使用代理模式？

// 场景

// 权限控制： 检查用户是否有权访问某个功能。
// 延迟加载（虚拟代理）： 比如加载一张巨大的高清图片，先用个占位图（代理），等真正需要显示时再加载。
// 日志/监控： 记录每次方法调用的时间、参数等。
// 远程访问（远程代理）： 比如调用远程服务器上的服务，就像调用本地方法一样（RPC 框架的基础）。

// 实际开发（尤其是 Java Spring 框架）中，我们很少手写上面的“静态代理”，而是使用动态代理。 结合 DI 实现依赖倒置


// 示例代码

interface Logger {
    log(message: string): void;

    error(message: string): void;
}

// 真实客户端对象
class ConsoleLogger implements Logger {
    log(message: string): void {
        console.log(`Log: ${message}`);
    }

    error(message: string): void {
        console.error(`Error: ${message}`);
    }
}

// 代理对象
class LoggerProxy implements Logger {
    private realLogger: Logger = new ConsoleLogger();
    private isAuthenticated: boolean;

    constructor(isAuthenticated: boolean) {
        this.isAuthenticated = isAuthenticated;
    }

    // 可拓展额外功能 与 真实对象解耦
    log(message: string): void {
        console.log('Proxy: Logging message');

        // 模拟发到 日志服务
        console.log(message);
    }

    // 可统一添加权限管理
    error(message: string): void {
        console.log('Proxy: Logging error');

        if (!this.isAuthenticated) {
            console.error('Proxy: Unauthorized access to error logging');
            return;
        }
        this.realLogger.error(message);
    }
}

const readLogger: Logger = new ConsoleLogger();
readLogger.log('This is a log message.');
readLogger.error('This is an error message.');
const logger: Logger = new LoggerProxy(true);
logger.log('This is a log message.');
logger.error('This is an error message.');

