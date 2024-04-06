{
  plandata.map((item, index) =>
    selectedplan === item.id ? (
      <LinearGradient
        key={index}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={colors.gradients.buttongradient}
        style={{
          padding: 2,
          marginBottom: 7,
          borderRadius: 50,
        }}>
        <View style={styles.planouter}>
          <View style={styles.planicon}>
            <MaterialIcons
              name={item.icon}
              size={48}
              color={colors.recharge.primary}
            />
          </View>
          <View style={styles.plantext}>
            <Text style={styles.headingtext3}>{item.name}</Text>
            <Text style={styles.headingtext2}>{item.duration}</Text>
          </View>
          <View style={styles.plancost}>
            <Text style={styles.headingtext4}>{item.cost}</Text>
          </View>
        </View>
      </LinearGradient>
    ) : (
      <TouchableOpacity
        style={[styles.planouter, {marginBottom: 7}]}
        key={index}
        onPress={() => handleplanclick(item)}>
        <View style={styles.planicon}>
          <MaterialIcons
            name={item.icon}
            size={48}
            color={colors.recharge.primary}
          />
        </View>
        <View style={styles.plantext}>
          <Text style={styles.headingtext3}>{item.name}</Text>
          <Text style={styles.headingtext2}>{item.duration}</Text>
        </View>
        <View style={styles.plancost}>
          <Text style={styles.headingtext4}>{item.cost}</Text>
        </View>
      </TouchableOpacity>
    ),
  );
}
