  ### javascript结构化

    Reaml(无特殊说明)包含: lexicalEnvironment, variableEnvironment, 这两种也统称为lexicalEncironment;
      lexicalEnvironment:
        Environment Records:
          declarative Environment Records( varible, constant, let, class, module, import, and/or funtion declarations)
          Function Environment Records
          module Environment Records
          object Environment Records
          global Environment Record
    在使用语法糖创建对象,数组的时候需要用到reaml

  ### 浏览器解析语法语义
    在解析服务器返回的数据时, 结尾的/r/n不知道在判断的时候如何去掉, 暂时采取的办法是在读取的时候将/r以后的字符截取掉