#include<bits/stdc++.h>
using namespace std;

class Figures{
private:
	class line{
	public:
		int k;
		int b;
		line(int k,int b){
			this->k = k;
			this->b = b;
		}
	};
	class circle{
	public:
		int r;
		int x;
		int y;
		circle(int x,int y,int r){
			this->x = x;
			this->y = y;
			this->r = r;
		}
	};
public:
	line getLineByInd(int ind){
		int k = 0;
		auto i = lines.begin();
		while(k!=ind){
			i++;
			if (i==lines.end()){
				break;
			}
			k++;
		}
		if (k!=ind){
			throw ("error ind");
		}
		return *i;
	}
	circle getCircleByInd(int ind){
		int k = 0;
		auto i = circles.begin();
		while(k!=ind){
			i++;
			if (i==circles.end()){
				break;
			}
			k++;
		}
		if (k!=ind){
			throw ("error ind");
		}
		return *i;
	}
	void intersectionLines(int ind1,int ind2){
		try{
			line l1 = getLineByInd(ind1);
			line l2 = getLineByInd(ind2);
			if (l1.k == l2.k){
				cout << "Lines are parallel" << endl;
			}
			else {
				cout << "Intersection Point " << "x= "<< (l2.b-l1.b)/(l1.k-l2.k) << " y= " << l1.k*(l2.b-l1.b)/(l1.k-l2.k)+l1.b << endl;
			}
		}
		catch(const char* e){
			cout << e << endl;
		}
		
	}
	void angleLines(int ind1,int ind2){
		try{
			line l1 = getLineByInd(ind1);
			line l2 = getLineByInd(ind2);
			if (l1.k*l2.k == -1){
				cout << "Angle is pi/2" << endl;
			}
			else {
				cout << "tg= " << ((double)l2.k-l1.k)/((double)1+l2.k*l1.k) << endl;
			}
		}
		catch(const char* e){
			cout << e << endl;
		}
	}
	void intersectionCircles(int ind1,int ind2){
		try{
			circle c1 = getCircleByInd(ind1);
			circle c2 = getCircleByInd(ind2);
			double dist = distCircles(ind1,ind2);
			double r1 = (c1.r+c2.r);
			double r2 = abs(c1.r-c2.r);
			if (r1 < dist || r2 > dist){
				cout << "No intersection" << endl;
			}
			else if (r1 == dist || r2 == dist){
				cout << "One point" << endl;
			}
			else{
				cout << "Two point" << endl;
			}
		}
		catch(const char* e){
			cout << e << endl;
		}
	}
	double distCircles(int ind1,int ind2){
		try{
			circle c1 = getCircleByInd(ind1);
			circle c2 = getCircleByInd(ind2);
			double dist = (sqrt((c1.x-c2.x)*(c1.x-c2.x)+(c1.y-c2.y)*(c1.y-c2.y)));
			return dist;
		}
		catch(const char* e){
			cout << e << endl;
		}
	}
	void addLine(int k,int b){
		line line1(k,b); 
		lines.push_back(line1);
	}
	void addCircle(int x,int y,int r){
		circle circle1(x,y,r);
		circles.push_back(circle1);
	}
	void removeLastLine(){
		lines.pop_back();
	}
	void removeLastCircle(int ind){
		lines.pop_back();
	}
	void printLines(){
		for(auto i=lines.begin();i!=lines.end();i++){
			line l = *i;
			cout << "Line " << l.k << " " << l.b << endl;
		}
	}
	void printCircles(){
		for(auto i=circles.begin();i!=circles.end();i++){
			circle c = *i;
			cout << "Circle " << c.x << " " << c.y << " " << c.r << endl;
		}
	}
	list<line> lines;
	list<circle> circles;
};

int main (){
	
	Figures f;
	
	f.addLine(1,1);
	f.addLine(2,0);
	f.addCircle(0,0,1);
	f.addCircle(2,0,1);
	f.printLines();
	f.printCircles();
	f.intersectionLines(0,1);
	f.angleLines(0,1);
	f.distCircles(0,1);
	f.intersectionCircles(0,1);
	return 0;
}
