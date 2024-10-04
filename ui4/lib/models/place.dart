class Place {
  final int id;
  final String name;
  final String bestTimeToVisit;
  final String bestThingsToDo;
  final String image;

  Place({
    required this.id,
    required this.name,
    required this.bestTimeToVisit,
    required this.bestThingsToDo,
    required this.image,
  });

  factory Place.fromJson(Map<String, dynamic> json) {
    return Place(
      id: int.parse(json['id']),
      name: json['name'],
      bestTimeToVisit: json['bestTimeToVisit'],
      bestThingsToDo: json['bestThingsToDo'],
      image: json['image'],
    );
  }
}
