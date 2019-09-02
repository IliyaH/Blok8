namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class stationLineVersion : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Lines", "Version", c => c.Long(nullable: false));
            AddColumn("dbo.StationLines", "Version", c => c.Long(nullable: false));
            AddColumn("dbo.Stations", "Version", c => c.Long(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Stations", "Version");
            DropColumn("dbo.StationLines", "Version");
            DropColumn("dbo.Lines", "Version");
        }
    }
}
